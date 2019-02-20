/*
相当于Vue的函数
 */
function MVVM(options) {
  // debugger
  // 保存配置对象到vm上
  this.$options = options;
  // 保存data对象到vm和变量data上
  var data = this._data = this.$options.data;
  // 保存vm到变量me
  var me = this;
  // 遍历data中所有属性
  Object.keys(data).forEach(function (key) {
    // 对指定属性实现数据代理
    me._proxy(key);
  });

  observe(data, this);

  // 创建一个用于编译模板的compile对象
  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    // 保存vm
    var me = this;
    // 给vm添加指定属性, 使用属性描述符(添加getter/setter)
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      // 当通过vm.xxx读取属性值时自动调用
      get: function proxyGetter() {
        // 读取data中对应的属性值返回
        return me._data[key];
      },
      // 当通过vm.xxx=value设置新的属性值时自动调用
      set: function proxySetter(newVal) {
        // 最新的值保存到data对应的属性上
        me._data[key] = newVal;
      }
    });
  }
};