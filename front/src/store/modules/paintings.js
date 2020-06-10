// import Vue from 'vue';
import { vuexfireMutations, firebaseAction } from 'vuexfire';
import { paintingsDB } from '@/firebase';

const state = {
  paintings: [],
  artMovements: [
    'Classicism',
    'Post-Impressionism',
    'Impressionism',
    'Cubism',
    'Realism',
    'Romanticism',
    'Gothic',
    'Baroque',
    'Modern',
    'Renaissance',
    'Humanism',
  ],
};

const mutations = {
  setPaintings(state, newPaintings) {
    state.paintings = newPaintings;
  },

  addPainting(state, newPainting) {
    state.paintings.push(newPainting);
    console.log(newPainting);
  },

  updatePainting(state, newPainting) {
    // ne radi jos
    const index = state.paintings.findIndex(
      painting => painting.id == newPainting.id
    );
    paintingsDB.child(state.paintings[index]['.key']).update(newPainting);
  },

  movePaintingOnMap(state, payload) {
    const index = state.paintings.findIndex(
      painting => painting.name == payload.name
    );
    let newPainting = { ...state.paintings[index] };
    newPainting.coords = [payload.coords.lng, payload.coords.lat];
    paintingsDB.child(state.paintings[index]['.key']).update(newPainting);
  },

  removePainting(state, paintingId) {
    const index = state.paintings.findIndex(
      painting => painting.id == paintingId
    );
    state.paintings.splice(index, 1);
  },
};

const actions = {
  bindPaintings: firebaseAction(({ bindFirebaseRef }) => {
    // return the promise returned by `bindFirebaseRef`
    return bindFirebaseRef('paintings', paintingsDB);
  }),

  async addPaintingAction({ commit, dispatch }, payload) {
    try {
      // request to back-end
      console.log(payload);
      const data = payload;
      commit('addPainting', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async updatePaintingAction({ commit, dispatch }, payload) {
    try {
      // request to back-end
      const data = payload;
      commit('updatePainting', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async removePaintingAction({ commit, dispatch }, payloadId) {
    try {
      // request to back-end
      const data = payloadId;
      commit('removePainting', data);
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
