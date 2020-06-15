import Vue from 'vue';

const state = {
  entries: [],
};

const mutations = {
  addEntries(state, newEntries) {
    state.entries.push(...newEntries);
  },

  deleteEntry(state, name) {
    state.entries = state.cities.filter(city => city.name !== name);
  },

  setEntries(state, entries) {
    Object.assign(state.entries, entries);
  },

  deleteAllEntries() {
    Object.assign(state.entries, []);
  },

  deleteUnused(state, names) {
    state.entries = state.entries.filter(entry => names.includes(entry));
  },
};

const actions = {

  async geocodeForward({commit}, city){
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${Vue.prototype.$cageApiKey}`
    const { data } = await Vue.$axios.get(url);
    const coords = data.results[0].geometry;
    return [coords.lng, coords.lat]
  },

  async geocodeReverse({commit}, city){
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${Vue.prototype.$cageApiKey}`
    const { data } = await Vue.$axios.get(url);
    const coords = data.results[0].geometry;
    return [coords.lat, coords.lng]
  },

};

const getters = {
  getEntries: getCageApiKey => state.cageApiKey,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
