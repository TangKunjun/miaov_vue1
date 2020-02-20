import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 定义store

const store = new Vuex.Store({
    state: {
        count: 10
    },
    mutations: {
      updateCount(state, obj) {  // 改变状态
        state.count+=obj.add;
      },
      updateCount2(state, obj) {  // 只要提交了mutations就会有记录 但是有异步操作 记录的值就会延时 这个时候需要放到actions
          setTimeout(function(){
            state.count*=obj.add;
          }, 30000)
      }
    },
    getters: {  // 相当于计算属性
        totals (state) {
            return state.count + "是我"
        }
    },
    actions: {    // 用于做异步操作  通过$store.dispath派发 在actions中异步提交mutatios
        updateCountAction(store, obj) {
            setTimeout(function(){
                store.commit("updateCount", obj)
            }, 3000)
        }
    }
});

export default store;
