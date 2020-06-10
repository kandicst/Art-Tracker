import Vue from 'vue';
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import {artistsDB} from '@/firebase'

const state = {
  artists: [
  ],
};

const mutations = {
  setArtist(state, newArtists) {
    state.artists = newArtists;
  },

  addArtist(state, newArtist) {
    state.artists.push(newArtist);
  },

  updateArtist(state, newArtist) {
    const index = state.artists.findIndex(artist => artist.id == newArtist.id);
    Object.assign(state.artists[index], newArtist);
  },

  moveArtistOnMap(state, payload) {
    const index = state.artists.findIndex(
      artist => artist.name == payload.name
    );
    let newArtist = { ...state.artists[index] };
    newArtist.coords = [payload.coords.lng, payload.coords.lat];
    artistsDB.child(state.artists[index]['.key']).update(newArtist);
  },

  removeArtist(state, artistId) {
    const index = state.artists.findIndex(artist => artist.id == artistId);
    state.artists.splice(index, 1);
  },
};

const actions = {
  async getArtistAction({ commit, dispatch }) {
    try {
      // request to back-end
      const data = {};
      commit('setArtists', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  bindArtists: firebaseAction(({ bindFirebaseRef }) => {
    // return the promise returned by `bindFirebaseRef`
    return bindFirebaseRef('artists', artistsDB)
  }),

  async addArtistAction({ commit, dispatch }, payload) {
    try {
      commit('addArtist', payload);
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async updateArtistAction({ commit, dispatch }, payload) {
    try {
      commit('updateArtist', payload);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async removeArtistAction({ commit, dispatch }, payloadId) {
    try {
      // request to back-end
      commit('removeArtist', payloadId);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },
};

const getters = {
  getAllArtists: state => state.artists,
  getArtistById: state => id =>  state.artists.filter(item => item['.key'] == id)[0],
  // get Artists based on current map
  getArtists: (state, getters, rootState, rootGetters) => {
    const map = rootGetters['map/getSelectedMap'].name;

    return state.artists.filter(item => item.map == map);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
