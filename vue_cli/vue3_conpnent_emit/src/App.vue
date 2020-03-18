<template>
  <div id="app">
    <button @click="isShow=true">model</button>
    <button @click="isShow2=true">model2</button>
    <button @click="isShow3=true">model3</button>
    <Model v-show="isShow" modal-title="模态框标题" @on-ok="okHanld($event)" @on-no="onHanld"></Model>

    <Model v-show="isShow2" :appShow.sync="isShow2" modal-title="模态框标题2"></Model>

    <Model v-show="isShow3" v-model="isShow3" modal-title="模态框标题3"></Model>
  </div>
</template>

<script>
import Model from './components/Model.vue'

export default {
  name: 'app',
  data() {
    return {
        isShow: false,
        isShow2: false,
        isShow3: false,
    }
  },
  components: {
      Model
  },
  methods: {
      okHanld(e){
          console.log(e)
      },
      onHanld(){

          this.isShow = false;
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
