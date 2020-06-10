import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import snackbar from './modules/snackbar'
import paintings from './modules/paintings'
import artists from './modules/artists'
import map from './modules/map'
import autocomplete from './modules/autocomplete'
import geocoder from './modules/geocoder'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
  },
  modules: {
    snackbar: snackbar,
    paintings: paintings,
    artists: artists,
    map: map,
    autocomplete: autocomplete,
    geocoder: geocoder,
  }
})
