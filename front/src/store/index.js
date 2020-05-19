import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from './modules/snackbar'
import paintings from './modules/paintings'
import artists from './modules/artists'
import map from './modules/map'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    snackbar: snackbar,
    paintings: paintings,
    artists: artists,
    map: map
  }
})
