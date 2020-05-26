const express = require("express");

const app = express();
const Vue = require("vue");
const path = require("path");
const fs = require("fs");
const vueServerRenderer = require("vue-server-renderer").createRenderer({
    template: fs.readFileSync(path.join(__dirname, "./index.html"), "utf-8")  // 直接套入模版
});





app.get("*", (req, res) => {

    // 实例 每次访问都会创建新的实例 所以需要把路由交给前端
    const vueApp = new Vue({
        data: {
            message: 'hello ssr',
            url: req.url
        },
        template: `
        <div>
            <h1>欢迎来到vue</h1>
            <p>{{message}}</p>
            <p>你当前访问的路径是：{{url}} </p>
        </div>
    `
    })

    res.status(200);
    res.setHeader("Content-type", "text/html;charset=utf-8;");

    vueServerRenderer.renderToString(vueApp).then((html) => {
        console.log(html)
        res.end(html);
    } ).catch(err => console.log(err));


})

app.listen(4000, () => {
    console.log("启动成功")
});