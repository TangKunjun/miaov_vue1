var vueRouter = require("vue-router");
var Vue = require("vue");

Vue.use(vueRouter);

module.exports= () => {
    return new vueRouter({
        model: "history",
        routes: [
            {
                path: "/",
                name: "home",
                component: {
                    template: `
                    <div> 这是首页  </div>
                `
                }
            },
            {
                path: "/about",
                name: "home",
                component: {
                    template: `
                    <div> 这是关于页面  </div>
                `
                }
            }
        ]
    })
}