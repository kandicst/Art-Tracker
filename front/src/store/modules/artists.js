import Vue from 'vue';

const state = {
  artists: [
    {
      name: 'Pablo Picasso',
      birthday: { day: '25', month: 'June', year: '1998' },
      birthplace: 'Malaga, Spain',
      nationality: 'French',
      artMovement: 'Imperialism',
      coord: [-4.4260, 36.7167],
      death: { day: '', month: '', year: '' },
      img: "https://www.biography.com/.image/t_share/MTY2NTIzNTAyNjgwMDg5ODQy/pablo-picasso-at-his-home-in-cannes-circa-1960-photo-by-popperfoto_getty-images.jpg"
    },
    {
      name: 'Ludwig van Bethoven',
      birthday: { day: '25', month: 'June', year: '1998' },
      birthplace: 'Novi Sad, Serbia',
      nationality: 'French',
      artMovement: 'Imperialism',
      coord: [20.15, 44.98],
      death: { day: '', month: '', year: '' },
      img: ""
    },
    {
      name: 'Leonardo da Vinci',
      birthday: { day: '25', month: 'June', year: '1998' },
      birthplace: 'Florence, Italy',
      nationality: 'French',
      artMovement: 'Imperialism',
      coord: [11.2558, 43.7696],
      death: { day: '', month: '', year: '' },
      img: "https://www.biography.com/.image/t_share/MTY2MzU4MjUzMDA4MDcwMzE4/portrait-of-leonardo-da-vinci-1452-1519-getty.jpg"
    },
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

  async addArtistAction({ commit, dispatch }, payload) {
    try {
      console.log('-----------------');
      console.log(payload);
      // request to back-end
      const data = payload;
      commit('addArtist', data);
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async updateArtistAction({ commit, dispatch }, payload) {
    try {
      // request to back-end
      const data = payload;
      commit('updateArtist', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async removeArtistAction({ commit, dispatch }, payloadId) {
    try {
      // request to back-end
      const data = payloadId;
      commit('removeArtist', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },
};

const getters = {
  getArtists: state => state.artists,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
