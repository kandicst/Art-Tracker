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
  filter:{
    date1:null,
    date2:null,
  }
};

const mutations = {
  setPaintings(state, newPaintings) {
    state.paintings = newPaintings;
  },
  setFilter(state, filter){
    state.filter = filter;
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
  getArtMovements: state => state.artMovements,
  getAllPaintings: state => state.paintings,
  // get paintings by  map
  getPaintings: (state, getters, rootState, rootGetters) => {
    const map = rootGetters['map/getSelectedMap'].name;
    state.paintings.map(painting => {
      painting.artist = rootGetters['artists/getArtistById'](painting.artistId);
    });

    return state.paintings.filter(item => {
      if (item.artist) return item.artist.map == map;
      return false;
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
