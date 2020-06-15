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
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return value;
                },
                set(newValue) {
                    console.log("set", newValue)
                    value = newValue;
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
                    node.textContent = this._data[RegExp.$1];
                }

            } else if (node.nodeType === 1) {  // 处理标签
                // this.compileNode(node)
            }

            if(node.childNodes.length > 0) { // 如果还有子节点就一直递归
                this.compileNode(node)
            }
        })
    }

}
