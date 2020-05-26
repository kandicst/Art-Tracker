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
  /** Uses teleport API to query cities based on partial user input */
  async search({ commit }, data) {
    if (!data) return;

    let url = `https://api.teleport.org/api/cities/?search=${data}&limit=10`;
    let resp = await Vue.$axios.get(url);
    let cities = resp.data._embedded['city:search-results'];
    let newEntries = cities.map(city => {
      city = city.matching_full_name.replace(/\([^}]*\)/, '');
      city = city.replace(/,.*,/, ',').trim();
      city = city.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return city;
    });
    let unique = [...new Set(newEntries)];
    await commit('addEntries', unique);
  },

  async deleteUnused({ commit }, names) {
    commit('deleteUnused', names);
  },
};

const getters = {
  getEntries: state => state.entries,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
