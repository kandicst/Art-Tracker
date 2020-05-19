// import Vue from 'vue';

const state = {
  mapOptions: [
    { name: 'World', bounds: [[-190, -55], [190, 85]], zoom: 1.5 },
    { name: 'Europe', bounds: [[-26.4, 30], [60, 73]], zoom: 1.5 },
    { name: 'United States', bounds: [[-190, -60], [190, 85]]  },
    { name: 'Serbia', bounds: [[-190, -60], [190, 85]]  },
  ],
  selectedMap: { name: 'World', bounds: [[-190, -55], [190, 85]], zoom: 1.5},
};


const mutations = {
  changeSelectedMap(state, newMap) {
    state.selectedMap = Object.assign({}, newMap);
  },
};

const actions = {
  changeSelectedMapAction({ commit, dispatch }, data) {
    try {
      commit('changeSelectedMap', data);
    } catch (error) {
      console.log(error);
      // dispatch("snackbar/showError", "No such map!");
    }
  },
};

const getters = {
  getMapOptions: state => state.mapOptions,
  getSelectedMap: state => state.selectedMap,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
