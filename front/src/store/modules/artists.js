import Vue from 'vue';
import { vuexfireMutations, firebaseAction } from 'vuexfire';
import { artistsDB } from '@/firebase';

const state = {
  artists: [],
  search: '',
  filter: {
    date1: null,
    date2: null,
    periods: [],
  },
};

const mutations = {
  setArtist(state, newArtists) {
    state.artists = newArtists;
  },
  setSearch(state, search) {
    state.search = search;
  },
  setFilter(state, filter) {
    state.filter = filter;
  },
  addArtist(state, newArtist) {
    artistsDB.push(newArtist);
  },

  updateArtist(state, payload) {
    const { key, newArtist } = payload;
    artistsDB.child(key).update(newArtist);
  },

  moveArtistOnMap(state, payload) {
    const index = state.artists.findIndex(
      artist => artist.name == payload.name
    );
    let newArtist = { ...state.artists[index] };
    if (payload.birthplace) newArtist.birthplace = payload.birthplace;
    newArtist.coords = [payload.coords.lng, payload.coords.lat];
    artistsDB.child(state.artists[index]['.key']).update(newArtist);
  },

  removeArtist(state, key) {
    artistsDB.child(key).remove();
  },
};

const actions = {
  bindArtists: firebaseAction(({ bindFirebaseRef }) => {
    // return the promise returned by `bindFirebaseRef`
    return bindFirebaseRef('artists', artistsDB);
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

  async moveArtistAction({ commit, dispatch }, payload) {
    try {
      if (payload.revert) {
        commit('moveArtistOnMap', payload);
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

      const type = info.components._type;
      const city = info.components[type] || 'Unknown';
      console.log(info.components);
      payload.birthplace = city + ', ' + country;
      // payload.birthplace.replace("Municipality", "")
      commit('moveArtistOnMap', payload);
    } catch (error) {
      console.log(error);
      // dispatch('snackbar/showError', error.response.data, { root: true });
      throw new Error('cannot place on location');
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
  getArtistById: state => id =>
    state.artists.filter(item => item['.key'] == id)[0],
  // get Artists based on current map
  getArtists: (state, getters, rootState, rootGetters) => {
    const map = rootGetters['map/getSelectedMap'].name;

    let dates = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };
    return state.artists.filter(item => {
      let birthday = new Date(
        item.birthday.year,
        dates[item.birthday.month],
        item.birthday.day
      );
      let death = new Date(
        item.death.year,
        dates[item.death.month],
        item.death.day
      );
      let afterFirst =
        !state.filter.date1 || new Date(state.filter.date1) <= birthday;
      let beforeSecond =
        !state.filter.date2 || death <= new Date(state.filter.date2);
      let artMovement =
        state.filter.periods.length == 0 ||
        state.filter.periods.includes(item.artMovement);
      return (
        item.map == map &&
        item.name.includes(state.search) &&
        afterFirst &&
        beforeSecond &&
        artMovement
      );
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
