import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from "axios";
import VueHotkey from 'v-hotkey'


let nodeGeocoder = require('node-geocoder');
let options = {provider: 'openstreetmap'};
let geoCoder = nodeGeocoder(options);

Vue.prototype.$geoCoder = geoCoder;
Vue.prototype.$cageApiKey = '0153a27f5a664fe284e2b88db6bc44c7'

Vue.prototype.context = '';

Vue.use(VueHotkey)
// Vue.use(firestorePlugin)
Vue.$axios = Axios;

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
