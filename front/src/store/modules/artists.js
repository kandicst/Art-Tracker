import Vue from 'vue';

const state = {
  artists: [
    {
      id: 1,
      name: 'Pablo Picasso',
      birthday: { day: '25', month: 'June', year: '1998' },
      birthplace: 'Malaga, Spain',
      nationality: 'French',
      artMovement: 'Imperialism',
      map: 'World',
      coords: [-4.426, 36.7167],
      death: { day: '', month: '', year: '' },
      img:
        'https://www.biography.com/.image/t_share/MTY2NTIzNTAyNjgwMDg5ODQy/pablo-picasso-at-his-home-in-cannes-circa-1960-photo-by-popperfoto_getty-images.jpg',
    },
    {
      id: 2,
      name: 'Ludwig van Bethoven',
      birthday: { day: '25', month: 'June', year: '1998' },
      birthplace: 'Novi Sad, Serbia',
      nationality: 'French',
      map: 'World',
      artMovement: 'Humanism',
      coords: [20.15, 44.98],
      death: { day: '', month: '', year: '' },
      img: '',
    },
    {
      id: 3,
      name: 'Leonardo da Vinci',
      birthday: { day: '25', month: 'June', year: '1998' },
      birthplace: 'Florence, Italy',
      nationality: 'French',
      artMovement: 'Humanism',
      map: 'World',
      coords: [11.2558, 43.7696],
      death: { day: '13', month: 'May', year: '2003' },
      img:
        'https://www.biography.com/.image/t_share/MTY2MzU4MjUzMDA4MDcwMzE4/portrait-of-leonardo-da-vinci-1452-1519-getty.jpg',
    },
    {
      id: 4,
      name: 'Leonardo di Caprio',
      birthday: { day: '25', month: 'June', year: '1998' },
      birthplace: 'New York, USA',
      nationality: 'Murican',
      artMovement: 'Baroque',
      map: 'United States',
      coords: [-80.006, 50.7128],
      death: { day: '13', month: 'May', year: '2003' },
      img:
        'https://i.insider.com/5e287d5cab49fd6d1a787977?width=825&format=jpeg&auto=webp',
    },
    {
      id: 5,
      name: 'Michelangelo Buonarroti',
      birthday: { day: '25', month: 'June', year: '1998' },
      birthplace: 'Caprese Michelangelo, Italy',
      nationality: 'Italian',
      artMovement: 'Impressionism',
      map: 'Europe',
      coords: [11.9871, 43.6415],
      death: { day: '13', month: 'May', year: '2003' },
      img: '',
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

  moveArtistOnMap(state, payload) {
    const index = state.artists.findIndex(
      artist => artist.name == payload.name
    );
    let newArtist = { ...state.artists[index] };
    newArtist.coords = [payload.coords.lng, payload.coords.lat];
    newArtist.nationality = 'Serbian';
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
  getAllArtists: state => state.artists,
  // getArtistById(state) {
  //   return id => {
  //     return state.artists.filter(item => item.id == id)[0];
  //   };
  // },
  getArtistById: state => id =>  state.artists.filter(item => item.id == id)[0],
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
