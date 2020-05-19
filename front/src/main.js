import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueShortKey from 'vue-shortkey'

import VueHotkey from 'v-hotkey'

Vue.use(VueHotkey)

// Vue.use('vue-shortkey', { prevent: ['input', 'textarea'] })
// Vue.use(require('vue-shortkey'))
Vue.use(VueShortKey);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
