var Vue = require("vue");
var createRouter = require("./router");

// 实例 每次访问都会创建新的实例 所以需要把路由交给前端
module.exports = (context) => {

    const router = createRouter();

    const app = new Vue({
        router,
        data: {
            message: 'hello ssr',
            url: context.url
        },
        template: `
        <div>
            <h1>欢迎来到vue</h1>
            <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/about">about</router-link></li>
            </ul>
            <p>{{message}}</p>
            <p>你当前访问的路径是：{{url}} </p>
            <router-view></router-view>
        </div>
    `
    });

    return {router, app}
}