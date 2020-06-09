// import Vue from 'vue';

const state = {
  mapOptions: [
    { name: 'World', bounds: [[-190, -55], [190, 85]]},
    { name: 'Europe', bounds: [[-35, 25], [70, 73]], zoom: 2},
    { name: 'United States', bounds: [[-150, 10], [-42, 65]], zoom: 4, center: [-99, 40]},
    { name: 'Serbia', bounds: [[16, 40], [25, 47]], center: [20.65, 44], zoom: 6.6},
  ],
  selectedMap: { name: 'World', bounds: [[-190, -55], [190, 85]]},
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
  getMapNames: state => state.mapOptions.map(map => map.name),
  getSelectedMap: state => state.selectedMap,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
