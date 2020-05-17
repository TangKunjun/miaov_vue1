<template>
  <div id="app">
    <mt-header fixed class="kugou-header">
      <router-link class="logo" to="/" slot="left">
        <img src="http://m.kugou.com/v3/static/images/index/logo.png" />
      </router-link>
      <mt-button @click="gotoSearch" icon="search" slot="right"></mt-button>
    </mt-header>

    <router-view class="navbar" name="nav"></router-view>

    <div class="content">
      <mt-spinner type="triple-bounce" v-show="$store.state.isLoading"></mt-spinner>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
    export default {
        name: 'App',
        methods: {
            gotoSearch(){
                this.$router.push('/search')
            }
        },
        created(){
        }
    }
</script>

<style>
  body {
    margin: 0;
  }
  .logo img{
    width: 2.5rem;
    display: inline-block;
    vertical-align: middle;
  }
  .kugou-header {
    height: 1rem;
    line-height: 3rem;
  }
  #app .navbar {
    top: .8rem;
  }
  .content {
    padding-top: 2rem;
  }

  .content .song-cell {
    border-bottom: 1px solid #e5e5e5;
  }
  .song-cell .plist-img {
    display: inline-block;
  }
  .song-cell .mint-cell-text {
    max-width: 4rem;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .song-cell .mint-cell-label {
    display: inline-block;
  }

  .song-cell .mint-cell-value {
    position: absolute;
    left: 2.3rem;
    top: 1.5rem;
  }

  .mint-spinner-triple-bounce {
    text-align: center;
  }
</style>
