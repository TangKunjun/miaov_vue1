/*
    客户端路由 需要将路由挂载到vue变成单页应用
 */

const createApp = require("./app");

const {app, router} = require({});

router.onReady(() => {
    app.$mount("#app");
})