import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 定义数据
    n: 1
  },
  mutations: { // 更新数据
    changeN(state, data) {
      state.n = data;
    }
  },
  actions: {

  }
})
