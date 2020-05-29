import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from "axios";
import VueShortKey from 'vue-shortkey'
import VueHotkey from 'v-hotkey'

let nodeGeocoder = require('node-geocoder');
let options = {provider: 'openstreetmap'};

let geoCoder = nodeGeocoder(options);

Vue.prototype.$geoCoder = geoCoder;
Vue.prototype.$cageApiKey = '3aa4e25981264231b8f61b3e2cede9d7'

Vue.use(VueHotkey)
Vue.$axios = Axios;

Vue.use(VueShortKey);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
