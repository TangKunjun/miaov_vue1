module.exports = {
    devServer: {
        // 设置代理
        proxy: {
            "/v1": {
                target: "http://m.kugou.com/", // 域名
                secure: false, // 是否http
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    "^/v1": "/"
                },
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36"
                }
            }
        }
    }
};