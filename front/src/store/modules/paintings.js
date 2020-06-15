import Vue from 'vue';
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
  hintArtMovement: {
    Classicism:
      'Classicism refers generally to a high regard for a classical period',
    Impressionism:
      'Impressionism is a 19th-century art movement characterized by relatively small, thin, yet visible brush strokes',
    Cubism: 'Art movement in early 20th century',
    Realism:
      'Realism (naturalism) is the attempt to represent subject matter truthfully or implausible, exotic, and supernatural elements',
    Romanticism:
      ' Romanticism was characterized by its emphasis on emotion and individualism as well as glorification of all the past and nature',
    Baroque:
      'Baroque is a style that flourished in Europe from the early 17th century until the 1740s',
    Modern:
      'Modern art denotes the styles and philosophy of the art produced during that era',
    Renaissance:
      'Renaissance (meaning "rebirth") art, perceived as the noblest of ancient traditions',
    Humanism:
      'Humanism refers to a perspective that affirms some notion of human freedom and progress',
    '': '',
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
  filter: {
    mediums: [],
  },
};

const mutations = {
  setPaintings(state, newPaintings) {
    state.paintings = newPaintings;
  },
  addPainting(state, newPainting) {
    paintingsDB.push(newPainting);
  },

  updatePainting(state, payload) {
    const { key, newPainting } = payload;
    paintingsDB.child(key).update(newPainting);
  },

  updatePaintingArtistName(state, payload) {
    const { oldName, newName } = payload;
    state.paintings.forEach(paint => {
      if (paint.artist?.name == oldName) paint.artist.name = newName;
    });
  },

  movePaintingOnMap(state, payload) {
    const index = state.paintings.findIndex(
      painting => painting.name == payload.name
    );
    let newPainting = { ...state.paintings[index] };
    if (payload.location) newPainting.location = payload.location;
    newPainting.coords = [payload.coords.lng, payload.coords.lat];
    paintingsDB.child(state.paintings[index]['.key']).update(newPainting);
  },

  removePainting(state, key) {
    paintingsDB.child(key).remove();
  },
  setFilter(state, filter) {
    state.filter = filter;
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

  async movePaintingAction({ commit, dispatch }, payload) {
    try {
      if (payload.revert) {
        commit('movePaintingOnMap', payload);
        return;
      }

      const { coords } = payload;
      const { data } = await Vue.$axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.lng}&key=${Vue.prototype.$cageApiKey}`
      );
      const info = data.results[0];
      if (!info) throw new Error();

      const country = info.components.country;
      if (!country) throw new Error();

      const city =
        info.components.city ||
        info.components.town ||
        info.components.village ||
        info.components.county ||
        info.components.state ||
        'Unknown';
      payload.location = city + ', ' + country;
      commit('movePaintingOnMap', payload);
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', 'Are you sure that paintings can swim?', {
        root: true,
      });
      throw new Error('cannot place on location');
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
  getPaintingById: state => id =>
    state.paintings.filter(item => item['.key'] == id)[0],
  // get paintings by  map
  getPaintings: (state, getters, rootState, rootGetters) => {
    const map = rootGetters['map/getSelectedMap'].name;
    const search = rootGetters['artists/getSearch'];
    const filterPeriods = rootGetters['artists/getFilterPeriods'];
    state.paintings.map(painting => {
      painting.artist = rootGetters['artists/getArtistById'](painting.artistId);
    });

    // if painting artist satisfies filter
    // of painting itself
    const periodExp = painting => {
      return (
        filterPeriods.length == 0 ||
        filterPeriods.includes(painting.artMovement) ||
        filterPeriods.includes(painting.artist.artMovement) 
      );
    };

    return state.paintings.filter(item => {
      if (item.artist)
        return (
          item.artist.map == map &&
          periodExp(item) &&
          item.artist.name.toUpperCase().includes(search.toUpperCase()) &&
          (state.filter.mediums.length == 0 ||
            state.filter.mediums.includes(item.medium))
        );
      return false;
    });
  },
  getAllPeriods: state => {
    let periods = new Set();
    for (const p of state.paintings) {
      periods.add(p.artMovement);
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
