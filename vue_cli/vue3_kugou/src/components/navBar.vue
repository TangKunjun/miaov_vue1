<template>
    <mt-navbar fixed v-model="selected">
        <mt-tab-item :id="item.path" v-for="item of routes" :key="item.path">
            <router-link tag="div" :to="item.path">{{item.title}}</router-link>
        </mt-tab-item>
    </mt-navbar>
</template>

<script>
    import {routes} from "../routes/routes"
    export default {
        data() {
          return {
              selected: "/",
              routes: routes
          }
        },
        name: "navBar",
        created() {
            console.log(this.routes)
        }
    }
</script>

<style scoped>
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        font-size: 0.4rem;
        justify-content: space-around;
        top: .8rem;
        position: fixed;
        z-index: 99;
        width: 100%;
        background: #fff;
        box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;
    }
    li{
        padding: 10px 0;
    }
    a {
        text-decoration: none;
    }
</style>