function Compile(el, vm) {
  // 保存vm到compile对象
  this.$vm = vm;
  // 确定el元素并保存到compile对象
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  // 如果el存在
  if (this.$el) {
    // 1. 取出el中所有子节点封装到fragment对象中
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 编译fragment中所有层次子节点
    this.init();
    // 3. 将编译好的fragment的子节点又添加回el中
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function () {
    this.compileElement(this.$fragment);
  },

  /*
   编译指定元素/fragment的所有子节点
   */
  compileElement: function (el) {
    // 得到所有的子节点
    var childNodes = el.childNodes,
      // 保存compile
      me = this;

    // 遍历所有子节点
    [].slice.call(childNodes).forEach(function (node) {
      // 得到节点的文本内容
      var text = node.textContent;
      // 定义用于匹配的大括号表达式正则
      var reg = /\{\{(.*)\}\}/;
      // 如果当前节点是元素节点
      if (me.isElementNode(node)) {
        // 编译元素节点的所有指令
        me.compile(node);
      // 如果当前节点是大括号表达式格式的文本节点
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 编译文本节点
        me.compileText(node, RegExp.$1);
      }
      // 如果当前子节点还有子节点
      if (node.childNodes && node.childNodes.length) {
        // 通过递归调用实现所有层次子节点的编译
        me.compileElement(node);
      }
    });
  },

  /*
  编译元素节点中所有指令
   */
  compile: function (node) {
    // 得到所有的属性节点
    var nodeAttrs = node.attributes,
      me = this;

    // 遍历所有属性节点
    [].slice.call(nodeAttrs).forEach(function (attr) {
      // 得到属性名: v-on:click
      var attrName = attr.name;
      // 当前是否是一个指令属性
      if (me.isDirective(attrName)) {
        // 得到属性值, 也就是表达式: hint
        var exp = attr.value;
        // 得到指令名: on:click
        var dir = attrName.substring(2);
        // 是否是事件指令
        if (me.isEventDirective(dir)) {
          // 解析事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir);
        // 普通指令
        } else {
          // 调用对应的解析工具函数处理
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        node.removeAttribute(attrName);
      }
    });
  },

  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },

  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  }
};

/*
用于编译的工具对象
包含n个用于编译模板的方法
 */
var compileUtil = {
  // 编译: v-text或者{{}}
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },

  // 编译: v-hmtl
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },

  // 编译: v-model
  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model');

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener('input', function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  // 编译: v-class
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },

  /*
  真正去进行模板解析的方法
  node: 需要编译的节点对象
  vm: vm对象
  exp: 表达式    name
  dir: 指令名  text/html/class/model
   */
  bind: function (node, vm, exp, dir) {
    // 根据指令名得到一个用于更新节点的更新函数
    var updaterFn = updater[dir + 'Updater'];
    // 调用更新函数第一次更新节点  ===> 实现初始化显示
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    // 为表达式创建对应的watcher对象
    new Watcher(vm, exp, function (value, oldValue) {
      // 更新节点
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  eventHandler: function (node, vm, exp, dir) {  // hint  on:click
    // 得到事件类型/名: click
    var eventType = dir.split(':')[1],
      // 根据表达式名得到methods对应的事件回调函数
      fn = vm.$options.methods && vm.$options.methods[exp];

    // 如果都存在, 给节点绑定指定事件名和回调函数的dom事件监听, 回调函数中的this指定为vm
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  /*
  得到指定表达式对应的值
   */
  _getVMVal: function (vm, exp) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};


/*
包含n个更新节点的方法的对象
 */
var updater = {

  // 更新节点的textContent属性
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的innerHTML属性
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的className属性
  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    node.className = className ? className + ' ' + value : value
  },

  // 更新节点的value属性
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};