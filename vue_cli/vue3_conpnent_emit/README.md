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
v-model的本质是向子组件绑定value，然后监听input事件


##事件总线 event bus
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
这个方法的弊端就是挂载多了，任何组件能用会出现不可控
