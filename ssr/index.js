const express = require("express");

const app = express();
const Vue = require("vue");
const path = require("path");
const fs = require("fs");
const vueServerRenderer = require("vue-server-renderer").createRenderer({
    template: fs.readFileSync(path.join(__dirname, "./index.html"), "utf-8")  // 直接套入模版
});

const App = require("./entry-server");



app.get("*", async (req, res) => {

    res.status(200);
    res.setHeader("Content-type", "text/html;charset=utf-8;");


    const app = await App({url: req.url});

    vueServerRenderer.renderToString(app).then((html) => {
        console.log(html)
        res.end(html);
    } ).catch(err => console.log(err));

})

app.listen(4000, () => {
    console.log("启动成功")
});