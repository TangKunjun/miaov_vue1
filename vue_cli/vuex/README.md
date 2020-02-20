# VueX

store代码

 ```
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
  })
  
  export default store;
 ```

**导入根部组件**

```
import store from './store'
export default {
  name: 'App',
  store,
  components: {
    HelloWorld,
  }
}
```

**调用store**

```
<template>
    <div>
        hello2,一起学习vue
         <p>{{n}}</p>
         <p>{{m}}</p>
         <button @click="changeCount">点击改变状态</button>
    <div>{{$store.getters.totals}}</div>
    </div>
</template>

<script>
export default {
    data() {   // 状态改变 它并不会改变
        return {
            n: this.$store.state.count
        }
    },
    computed: {
        m() {
            return this.$store.state.count
        }
    },
    methods: {
        changeCount() {
            this.$store.commit('updateCount', {
                add: 15
            }),
            // this.$store.dispatch("updateCountAction", {   // 触发actions
            //     add: 15
            // })
        }
    },
}
</script>
```



**注意事项**

1、每个应用仅仅包括一个stroe实例（多个需要用modules划分）

2、更改store中的状态唯一方法是提交mutation

3、Mutation必须是同步的

4、Action 可以包含任意异步操作

5、Action提交的是mutation，而不是直接更改状态

