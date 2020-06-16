// 发布订阅

class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(item => item.update())
    }
}

class Watcher {
    constructor(name) {
        this.name = name;
    }
    update() {
        console.log(this.name + "更新了")
    }
}

let a = new Watcher("a");
let b = new Watcher("b");
let c = new Watcher("c");
let d = new Watcher("d");

let dep = new Dep();
dep.addSub(a);
dep.addSub(b);
dep.addSub(c);
dep.addSub(d);

dep.notify();