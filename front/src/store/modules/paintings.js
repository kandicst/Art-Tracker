// import Vue from 'vue';

const state = {
  paintings: [
    {
      name: 'Mona Lisa',
      artist: { name: 'Leonardo da Vinci' },
      created: '1939',
      location: 'Louvre, Paris',
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
