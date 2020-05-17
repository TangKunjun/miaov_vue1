import Vue from 'vue'
import App from './App.vue'
import vueJsonp from "vue-jsonp"
import vueScroller from "vue-scroller"
import {ToastPlugin} from "vux"

Vue.config.productionTip = false

Vue.use(vueJsonp);
Vue.use(ToastPlugin);
Vue.use(vueScroller);

new Vue({
  render: h => h(App),
}).$mount('#app')
