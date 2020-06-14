// import Vue from 'vue';
import { vuexfireMutations, firebaseAction } from 'vuexfire';
import { paintingsDB } from '@/firebase';

const state = {
  paintings: [],
  artMovements: [
    'Classicism',
    'Impressionism',
    'Cubism',
    'Realism',
    'Romanticism',
    'Baroque',
    'Modern',
    'Renaissance',
    'Humanism',
  ],
  hintArtMovement:{
    
    'Classicism' : 'Classicism refers generally to a high regard for a classical period',
    'Impressionism' : 'Impressionism is a 19th-century art movement characterized by relatively small, thin, yet visible brush strokes',
    'Cubism' : "Art movement in early 20th century",
    'Realism' : 'Realism (naturalism) is the attempt to represent subject matter truthfully or implausible, exotic, and supernatural elements',
    'Romanticism' : ' Romanticism was characterized by its emphasis on emotion and individualism as well as glorification of all the past and nature',
    'Baroque' : 'Baroque is a style that flourished in Europe from the early 17th century until the 1740s',
    'Modern' : 'Modern art denotes the styles and philosophy of the art produced during that era',
    'Renaissance' : 'Renaissance (meaning "rebirth") art, perceived as the noblest of ancient traditions',
    'Humanism' : 'Humanism refers to a perspective that affirms some notion of human freedom and progress',
    '' : '',
  },
  mediums: [
    'Pastel',
    'Colage',
    'Tapestry',
    'Graffiti',
    'Charcoal ',
    'Oil',
    'Acrylic',
    'Watercolor',
    'Gouache',
    'Tempera',
    'Mosaic',
    'Encaustic',
  ],
  filter:{
    mediums:[]
  }
};

const mutations = {
  setPaintings(state, newPaintings) {
    state.paintings = newPaintings;
  },
  addPainting(state, newPainting) {
    paintingsDB.push(newPainting);
  },

  updatePainting(state, payload) {
    const {key, newPainting} = payload;
    paintingsDB.child(key).update(newPainting);
  },

  movePaintingOnMap(state, payload) {
    const index = state.paintings.findIndex(
      painting => painting.name == payload.name
    );
    let newPainting = { ...state.paintings[index] };
    newPainting.coords = [payload.coords.lng, payload.coords.lat];
    paintingsDB.child(state.paintings[index]['.key']).update(newPainting);
  },

  removePainting(state, key) {
    paintingsDB.child(key).remove();
  },
  setFilter(state, filter){
    state.filter = filter;
  }
};

const actions = {
  bindPaintings: firebaseAction(({ bindFirebaseRef }) => {
    // return the promise returned by `bindFirebaseRef`
    return bindFirebaseRef('paintings', paintingsDB);
  }),

  async addPaintingAction({ commit, dispatch }, payload) {
    try {
      commit('addPainting', payload);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async updatePaintingAction({ commit, dispatch }, payload) {
    try {
      commit('updatePainting', payload);
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async removePaintingAction({ commit, dispatch }, key) {
    try {
      commit('removePainting', key);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },
};

const getters = {
  getHintsMovement: state => state.hintArtMovement,
  getArtMovements: state => state.artMovements,
  getMediums: state => state.mediums,
  getAllPaintings: state => state.paintings,
  getPaintingById: state => id =>  state.paintings.filter(item => item['.key'] == id)[0],
  // get paintings by  map
  getPaintings: (state, getters, rootState, rootGetters) => {
    const map = rootGetters['map/getSelectedMap'].name;
    state.paintings.map(painting => {
      painting.artist = rootGetters['artists/getArtistById'](painting.artistId);
    });

    return state.paintings.filter(item => {
      if (item.artist) return item.artist.map == map && (state.filter.mediums.length == 0 || state.filter.mediums.includes(item.medium));
      return false;
    });
  },
  getAllPeriods: state=>{
    let periods = new Set();
    for (const p of state.paintings) {
      periods.add(p.artMovement)
    }
    return Array.from(periods);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
