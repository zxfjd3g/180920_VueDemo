function Observer(data) {
  // 保存data
  this.data = data;
  // 启动数据劫持工作
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    // 保存observer对象
    var me = this;
    // 遍历所有data中的属性(外层的)
    Object.keys(data).forEach(function (key) {

      // 给data重新定义响应式的属性
      me.defineReactive(data, key, data[key])
    });
  },

  defineReactive: function (data, key, val) {
    // 创建对应的dep对象
    var dep = new Dep();
    // 通过隐式递归, 实现对data中所有层次属性的劫持
    var childObj = observe(val);

    // 给data重新定义指定的属性(实现对指定属性的数据劫持)
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define

      // 返回属性值, 建立dep与watcher之间的关系
      get: function () {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知所有相关的订阅者(watcher)
        dep.notify();
      }
    });
  }
};

function observe(value, vm) {
  // 如果value不是对象, 直接对事
  if (!value || typeof value !== 'object') {
    return;
  }

  // 创建对应的observer对象
  return new Observer(value);
};


var uid = 0;

function Dep() {
  // 标识id
  this.id = uid++;
  // 用于保存所有相关watcher的数组
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    // 遍历所有相关的watcher去更新对应的节点
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};

Dep.target = null;