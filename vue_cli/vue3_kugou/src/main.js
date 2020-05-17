import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/index'
import MintUI from 'mint-ui'

import "mint-ui/lib/style.min.css"

Vue.config.productionTip = false;


Vue.use(MintUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
