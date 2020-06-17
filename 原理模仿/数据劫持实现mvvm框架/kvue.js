/**
 * 仿vue的mvvm框架
 */

class Kvue {
    constructor(options) {
        this.$options = options;     // 之所以加上一个特殊字符$(_)的原因是：在vue上data的属性会直接挂载到实例上，
        this._data = options.data;   // 如果不加$那么data里面有一个options属性，那实例出来的vm.options等于整个构造函数参数还是data里面的options呢？
                                     // 为了防止这种冲突，vue也在前面加了一个$(_)


        // 劫持数据
        this.observer(this._data);
        this.compile(options.el);
    }

    // 劫持数据的方法
    observer(data) {
        Object.keys(data).forEach(key => {
            let value = data[key];
            let dep = new Dep(); // 实例化发布者
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    if(Dep.target){ // 如果没有初始化观察者 则不执行
                        dep.addSub(Dep.target)
                    }
                    return value;
                },
                set(newValue) {
                    console.log("set", newValue);
                    if (value!==newValue) 
                    value = newValue;
                    dep.notify(newValue); // 执行发布
                }
            })
        })

    }

    // 编译函数
    compile(el) {
        let element = document.querySelector(el);
        this.compileNode(element);
    }

    // 这个主要是为了用于多次元素嵌套 好进行递归操作
    compileNode(element) {
        let childNodes = element.childNodes;
        // 将类数组转换成数组
        Array.from(childNodes).forEach(node => {
            if (node.nodeType === 3) { // 处理文本
                let nodeContent = node.textContent;
                let reg = /\{\{\s*(\S*)\s*\}\}/;     // 有可能是这样写{{ message }}  左右有空格
                if (reg.test(nodeContent)) {
                    // console.log(RegExp.$1)
                    node.textContent = this._data[RegExp.$1];  // 这里会执行一次get()数组 这个时候还没有watcher实例不能加入到subs数组 所以在get()上面做了一个判断

                    // 初始化的时候 每一个插值变成观察者
                    new Watcher(this, RegExp.$1, value => {
                        node.textContent = value;
                    });

                }

            } else if (node.nodeType === 1) {  // 处理标签 (包括input的双向绑定)
                let attrs = node.attributes;
                Array.from(attrs).forEach(attr => {
                    let attrName = attr.name;
                    let attrValue = attr.value;
                    if(attrName.indexOf("k-")===0){
                        attrName = attrName.substr(2);
                        if(attrName === "model") {
                            node.value = this._data[attrValue]
                        }
                        node.addEventListener("input", element => {
                            this._data[attrValue] = element.target.value;
                        })
                    }

                    // 初始化的时候 每一个插值变成观察者
                    new Watcher(this, attrValue, value => {
                        node.value = value;
                    });
                })
            }

            if(node.childNodes.length > 0) { // 如果还有子节点就一直递归
                this.compileNode(node)
            }
        })
    }

}

// 发布订阅中发布者
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify(node) {
        this.subs.forEach(item => item.update(node))
    }
}

// 订阅者
class Watcher {
    constructor(vm, exp, cb) {
        this.cb = cb;
        Dep.target = this;  // 相当将new Watcher这个实例绑定到了Dep.target上面

        vm._data[exp]; // 访问了一次get() 会把watcher添加到Dep的subs数组里面

        Dep.target = null; // 防止重复添加
    }
    update(data) {
        this.cb(data);  // 回调
        console.log( "更新了")
    }
}