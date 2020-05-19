// import Vue from 'vue';

const state = {
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

const mutations = {};

const actions = {};

const getters = {
    getArtMovements: state => state.artMovements,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
