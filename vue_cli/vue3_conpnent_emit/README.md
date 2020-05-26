# 组件之间的通信

## 父子组件的通信

父 ==> 子：<br>
    父：在调用子组件时绑定数据 <br>
    子：通过props接收父组件绑定的数据
        
子 ==> 父:<br>
    子：this.$emit('事件名')    <br>
    父：在子组件上面添加自定义事件
        
        
```
    父：
    <div id="app">
        <Model modal-title="模态框标题" @on-ok="okHanld($event)" @on-no="onHanld"></Model>
      </div>
        
    子：
    props: {
        modalTitle: {
            type: String,
            default: "提醒"
        }
    },
    methods: {
        okHandle() {
            this.$emit("on-ok", 123)
        },
        cancelHandle() {
            this.$emit("on-no")
        }
    }   
        
```
尊从单向绑定的原则父组件传到子组件的值，在子组件里面是无法更改的。<br>
如果要做到父子组件的双向绑定,有两种做法<br>

<strong>第一种做法(sync)：</strong>

```
父：
  
    <button @click="isShow2=true">model2</button>
    
    <Model v-show="isShow2" :appShow.sync="isShow2" modal-title="模态框标题2"></Model>

子：
    cancelHandle() {
        this.$emit("on-no");
        this.$emit("update:appShow", false)
    }
```
父组件绑定属性后面加.sync代表同步，运行做双向绑定<br>
子组件this.$emit("update:appShow", false)中update表示更新



<strong>第二种做法(v-model)：</strong>

```
父：
    <Model v-show="isShow3" v-model="isShow3" modal-title="模态框标题3"></Model>
    
子：
    cancelHandle() {
        this.$emit("on-no");
        this.$emit("input", false)
    }
```
v-model的本质是向子组件绑定value，然后监听input事件；也可以通过model属性自定义
```
model: {
    event: 'abc', // 将事件input改成了abc
    prop: 'data',  // 绑定的value改成了data
}
```


##事件总线 event bus

<b>第一种方法</b><br>
通过共有的有$emit事件的组件发起
```
发送组件:
    this.$root.$emit("fa");
    
接收组件:
    created(){
        this.$root.$on("fa", () => {})
    }
```
通过root的话 整个组件树任何一个组件都能接收，组件接收的时间是组件创建成功的钩子函数里，



<b>第二种方法</b><br>
通过创建新的vue，以插件的形式

```
 Vue.use({
    install(Vue) {
        Vue.prototype.$eventBus = new Vue;
    }
 })
 发送组件:
     this.$eventBus.$emit("fa");
 
 接收组件
 created(){
     this.$eventBus.$on("fa", () => {})
 }
```
自定义$eventBus的名

eventBus方法的弊端就是挂载多了，任何组件能用会出现不可控，且无法调试


##vuex

```
export default new Vuex.Store({
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
}


组件接收和改变数据
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
```
myObservable - 使用 SafeObserver

```
function myObservable(observer) {
  const safeObserver = new SafeObserver(observer); // 创建SafeObserver对象
  const datasource = new DataSource(); // 创建数据源
  datasource.ondata = (e) => safeObserver.next(e);
  datasource.onerror = (err) => safeObserver.error(err);
  datasource.oncomplete = () => safeObserver.complete();

  safeObserver.unsub = () => { // 为SafeObserver对象添加unsub方法
    datasource.destroy();
  };
  // 绑定this上下文，并返回unsubscribe方法
  return safeObserver.unsubscribe.bind(safeObserver); 
}
```
使用示例：
```
const unsub = myObservable({
  next(x) { console.log(x); },
  error(err) { console.error(err); },
  complete() { console.log('done')}
});
```