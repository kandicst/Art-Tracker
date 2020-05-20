import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from "axios";
import VueShortKey from 'vue-shortkey'

import VueHotkey from 'v-hotkey'

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
