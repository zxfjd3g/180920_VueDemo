function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  // 用来关联相应的所有dep的容器对象
  this.depIds = {}; // {0:dep0, 1: dep1}
  // 得到表达式对应的属性值保存
  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 得到表达式对应的新的属性值
    var value = this.get();
    // 得到老值
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      // 调用回调函数更新对应的节点
      this.cb.call(this.vm, value, oldVal);
    }
  },

  // 建立dep与watcher关系
  addDep: function (dep) {
    // 如果dep与watcher的关系还没有建立
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 建立dep到watcher关系
      dep.addSub(this);
      // 建立watcher到dep的关系
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    // 指定 dep对应的watcher为当前watcher
    Dep.target = this;
    // 从vm中的data取属性值
    var value = this.getVMVal();

    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k]; // 导致data中对应的属性的get调用
    });
    return val;
  }
};