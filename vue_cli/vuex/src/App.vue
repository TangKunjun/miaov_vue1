<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <Hello/>
    <Hello2/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Hello from './components/hello'
import Hello2 from './components/hello2'
import store from './store'
export default {
  name: 'App',
  store,
  components: {
    HelloWorld,
    Hello,
    Hello2
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
