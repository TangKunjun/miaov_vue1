import Vue from 'vue'
import Router from 'vue-router'
import search from  "@/views/search"
import searchBar from  "@/components/searchBar"
import {routes} from "./routes"

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...routes,
        {
            path: '/search',
            name: 'search',
            components: {
                nav: searchBar,
                default: search
            }
        },

    ]
})
