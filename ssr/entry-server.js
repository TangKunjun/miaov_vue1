/*
    服务端路由  需要把访问路径给vue-router 这样才能让对应的url展示对应的页面
 */


const createApp = require("./app");


// 外面的express服务使用 {url： / /about}

module.exports = (context) => {
    return new Promise((resolve, reject) => {
        const {app, router} = createApp(context);

        router.push(context.url);

        // 所有的异步组件都完成了 就会触发这个
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();  // url和组件的匹配

            if (!matchedComponents.length) {  // 如果没有匹配到组件
                return reject({code: 400});
            }
            resolve(app);
        }, reject)
    })
}