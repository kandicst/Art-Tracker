// import Vue from 'vue';

const state = {
  paintings: [
    {
      name: 'Mona Lisa',
      artist: { name: 'Leonardo da Vinci' },
      created: '1939',
      location: 'Paris, France',
      coords: [2.3522, 48.8566],
      medium: 'Brush',
      description: 'This is one of the best dfkjlskfd fldkaskljfs fdsla fljkf dsla lfdjs fldsk',
      artMovement: 'Impressionism',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/300px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    },
    {
      name: 'Mona Lisa2',
      artist: { name: 'Leonardo da Vinci' },
      created: '1939',
      location: 'Barcelona, Spain',
      coords: [2.1734, 41.3851],
      medium: 'Brush',
      description: 'This is one of the best dfkjlskfd fldkaskljfs fdsla fljkf dsla lfdjs fldsk',
      artMovement: 'Impressionism',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/300px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    },
    {
      name: 'Mona Lisa3',
      artist: { name: 'Leonardo da Vinci' },
      created: '1939',
      location: 'Madrid, Spain',
      coords: [-3.7038, 40.4168],
      medium: 'Brush',
      description: 'This is one of the best dfkjlskfd fldkaskljfs fdsla fljkf dsla lfdjs fldsk',
      artMovement: 'Impressionism',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/300px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    },
    {
      name: 'Mona Lisa4',
      artist: { name: 'Leonardo da Vinci' },
      created: '1939',
      location: 'Amsterdam, Netherlands',
      coords: [4.8945, 52.3667],
      medium: 'Brush',
      description: 'This is one of the best dfkjlskfd fldkaskljfs fdsla fljkf dsla lfdjs fldsk',
      artMovement: 'Impressionism',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/300px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    },
    {
      name: 'Mona Lisa5',
      artist: { name: 'Leonardo da Vinci' },
      created: '1939',
      location: 'Londong, United Kingdom',
      coords: [-0.1278, 51.5074],
      medium: 'Brush',
      description: 'This is one of the best dfkjlskfd fldkaskljfs fdsla fljkf dsla lfdjs fldsk',
      artMovement: 'Impressionism',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/300px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    },
  ],
  artMovements: [
    'Classicism',
    'Post-Impressionism',
    'Impressionism',
    'Cubism',
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
  },

  updatePainting(state, newPainting) {
    const index = state.paintings.findIndex(
      painting => painting.id == newPainting.id
    );
    Object.assign(state.paintings[index], newPainting);
  },

  movePaintingOnMap(state, payload){
    const index = state.paintings.findIndex(painting => painting.name == payload.name);
    state.paintings[index].coords = [payload.coords.lng, payload.coords.lat];
  },

  removePainting(state, paintingId) {
    const index = state.paintings.findIndex(
      painting => painting.id == paintingId
    );
    state.paintings.splice(index, 1);
  },
};

const actions = {
  async getPaintingsAction({ commit, dispatch }) {
    try {
      // request to back-end
      const data = {};
      commit('setPaintings', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

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
  getPaintings: state => state.paintings,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
