import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from './modules/snackbar'
import paintings from './modules/paintings'
import paintingsDialog from './modules/paintingsDialog'
import artists from './modules/artists'
import artistsDialog from './modules/artistsDialog'
import map from './modules/map'
import autocomplete from './modules/autocomplete'


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
    paintingsDialog: paintingsDialog,
    artists: artists,
    artistsDialog: artistsDialog,
    map: map,
    autocomplete: autocomplete
  }
})
