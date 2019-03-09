;(function () {
  // 兼容浏览器/Node/Node vm(沙盒模块)/小程序 全局环境
  var root = (typeof self === 'object' && self.self === self && self ) ||
    (typeof global === 'object' && global.global === global && global) ||
    this || {}
  
  var ArrayProto = Array.prototype
  var push = ArrayProto.push
  var nativeIsArray = Array.isArray

  var _ = function (obj) {
    if(obj instanceof _) return obj
    if(!(this instanceof _)) return new _(obj)
    this._wrapped = obj
  }

  // nodeType 是为了判断非dom节点
  if(typeof exports != 'undefined' && !exports.nodeType) {
    if(typeof module != 'undefined' && !module.nodeType && module.exports) {
      // 避免再修改 exports 而导致不能正确输出
      exports = module.exports = _
    }
  } else {
    root._ = _
  }

  // 源码一开始的时候便储存之前的 _ 对象
  var previousUnderscore = root._
  _.noConflict = function() {
    root._ = previousUnderscore
    return this // 再一次赋值给全局对象
  }

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1

  var isArrayLike = function (collection) {
    var length = collection.length
    return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
  }

  _.VERSION = '0.1.0'

  _.function = function (obj) {
    return typeof obj === 'function' || false
  }
  _.isArray = nativeIsArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }
  _.isObject = function (obj) {
    var type = typeof obj

    return type === 'function' || type === 'object' || !!obj
  }
  _.keys = function (obj) {
    return Object.keys(obj)
  }

  _.functions = function (obj) {
    var names = []
    for (var key in obj) {
      if(_.isFunction(obj[key])) names.push(key)
    }
    return names.sort()
  }


  _.each = function (obj, callback) {
    var length, i = 0
    
    if(isArrayLike(obj)) {
      length = obj.length
      for(; i < length;i++) {
        if(callback.call(obj[i], obj[i], i) === false) {
          break
        }
      }
    } else {
      for( i in obj) {
        if(callback.call(obj[i], obj[i], i) === false) {
          break
        }
      }
    }
  }

  _.chain = function (obj) {
    var instance = _(obj)
    instance._chain = true
    return instance
  }

  var chainResult = function (instance, obj) {
    return instance._chain ? _(obj).chain() : obj
  }

  /**
    * 在 _.mixin(_) 前添加自己定义的方法
    */
  _.reverse = function(string){
    return string.split('').reverse().join('');
  }

  // 假设这里是数组 (这函数优化的功能 tql)
  _.map = function (obj, iteratee, context) {
    // 不传或 传个对象 或者 字符串 所以有必要有cb
    iteratee = cb(iteratee, context)

    var length = obj.length, results = Array(length)
    for(var index = 0; index < length; index++) {
      results[index] = iteratee(obj[index], index, obj)
    }

    return results
  }

  var cb = function (value, context, argCount) {
    if(_.iteratee !== builtinIteratee ) return _.iteratee(value, context)
    // [1, 2, 3].map(_.identity)
    if(value === null) return _.identity

    if(_.isFunction(value)) return optimizeCb(value,context, argCount)
    if(_.isObject(value) && !_.isArray(value)) return _.matcher(value)

    return _.property(value)
  }

  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity)
  }

  // [1, 2, 3].map(_.identity) 直接复制
  _.identity = function(value) {
    return value
  }
  // 类似于ES6 中的 const 和 _.noop 函数一样可以作为默认函数使用
  _.constant = function (value) {
    return function () {
      return value
    }
  }
  // if(!_.isFunction(callback)) callback = _.noop 减少判断
  _.noop = function () {}

  // 该函数判断 attr 对象中的键值是否在 object 中有并且相等
  _.matcher = function(attrs) {
    attrs = _.extend({}, attrs)
    return function (obj) {
      return _.isMatch(obj, attrs)
    }
  }
  // var stooge = {name: 'moe', age: 32};
  // _.isMatch(stooge, {age: 32}); => true
  _.isMatch = function (object, attrs) {
    var keys = _.keys(attrs), length = keys.length
    if(object === null) return !length
    var obj = Object(object)
    for(var i = 0;i < length;i++) {
      var key = [i]
      if(atts[key] !== obj[key] || !(key in obj)) return false
    }

    return true
  }
  _.property = function (path) {
    if(!_.isArray(obj)) {
      return shallowProperty(path)
    }

    return function (obj) {
      return deepGet(obj, path)
    }
  }

  // 如果不是数组 一层即可
  var shallowProperty = function (key) {
    return function(obj) {
      return obj === null ? void 0 : obj[key] // 引用地址的妙用
    }
  }
  // 根据路径取出深层次的值
  var deepGet = function(obj, path) {
    var length = path.length
    for(var i = 0;i < length;i++) {
      if(obj == null) return void 0
      obj = obj[path[i]] // 引用地址的妙用
    }
    return length ? obj : void 0
  }

  var optimizeCb = function (func, context, argCount) {
    if(context === void 0) return func
    // 其实就是为了避免使用 arguments，提高一点性能而已，
    // 没有2 是因为 没有只需要两个参数的
    switch(argCount) {
      case 1:
      return function (value) {
        return func.call(context, value)
      }
      case null:
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection)
        }
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection)
        }
    }

    return function() {
      return func.apply(context, arguments)
    }
  }


  // 内部函数restArgs
  var restArgs = function(func, startIndex) {
    startIndex = startIndex == null ? func.length -1 : +startIndex

    return function() {
      var length = Math.max(arguments.length - startIndex, 0)
      var rest = Array(length)
      var index = 0

      for(;index < length; index++) {
        rest[index] = arguments[index + startIndex]
      }

      // 鉴于 call 的性能要高于 apply
      switch(startIndex) {
        case 0:
          return func.call(this, rest)
        case 1:
          return func.call(this, arguments[0], rest)
        case 2:
          return func.call(this, arguments[0], arguments[1], rest)
      }

      var args = Array(startIndex + 1)
      for(index = 0; index < startIndex;i++) {
        args[index] = arguments[index]
      }

      args[startIndex] = rest
      return func.apply(this, args)
    }
  }
  // partial 函数
  var partial = restArgs(function (fn, args) {
    return restArgs(function(partialArgs) {
      var newArgs = args.concat(partialArgs)
      return fn.apply(this, newArgs)
    })
  })

  
  _.random = function(min, max) {
    if (max == null) {
      max = min
      min = 0
    }
    return min + Math.floor(Math.random() * (max - min + 1))
  }

  // XSS
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt',
    '"': '&quot;',
    "'": '&#x27',
    '`': '#x60'
  }
  
  // 将 escapeMap 传入的时候，可以得到 unescapeMap
  _.invert = function (obj) {
    var result = {}
    var keys = Object.keys(obj)
    for(var i = 0,length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i]
    }

    return result
  }

  var unescapeMap = _.invert(escapeMap)
  var createEscaper = function (map) {
    var escaper = function (match) {
      return map[match]
    }

    // 使用非捕获性分组 性能更好
    var source = '(?:'+ _.keys(map).join('|') +')'
    var testRegexp = RegExp(source)
    var replaceRegexp = RegExp(source, 'g')

    return function (string) {
      string = string == null ? '' : '' + string
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string
    }
  }
  _.escape = createEscaper(escapeMap)
  _.unescape = createEscaper(unescapeMap)

  

  // 这样才能在实例的_ 调用静态的方法
  _.mixin = function (obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name]
      _.prototype[name] = function () {
        var args = [this._wrapped]
        // _("1223").reverse() 把前面的拼接下来
        push.apply(args, arguments)

        // return func.apply(_, args)
        return cahinResult(this, func.apply(_, args))
      }
    })
    return _
  }

  _.mixin(_)

  // 去除_chain: true
  _.prototype.value = function () {
    return this._wrapped
  }
})()