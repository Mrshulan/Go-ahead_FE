function extend() {
  var deep = false
  var name, options, src, copy,clone, copyIsArray
  var length = arguments.length
  var i = 1
  var target = arguments[0] || {}

  // 如果第一个参数是boolean 那么第二个就是target
  if(typeof target === 'boolean') {
    deep = target
    target = arguments[i++] || {}
  }
  // 如果target不是对象 默认设置为{}
  if(typeof target !== 'object' && typeof target !== 'function'){
    target = {}
  }

  // 遍历所有的source
  for(;i < length;i++) {
    options = arguments[i]
    if(options != null) {
      for(name in options) {
        src = target[name]
        copy = options[name]

        if(target === copy) {
          continue
        }

        // 如果有必要可以判断是否是isPlainObject
        if(deep && copy && typeof copy === 'object'){
          copyIsArray = Array.isArray(copy)
          if(copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && (src.toString() === "[object Object]" )? src : {}
          }
          target[name] = extend(deep, clone, copy)
        } else if( copy !== undefined) {
          // 相同属性会被覆盖
          target[name] = copy
        }
      }
    }
  }

  return target
}

var obj1 = {
  value: {
      3: 1
  }
}

var obj2 = {
  value: [5, 6, 7],
}

var a = extend(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]);
console.log(a) // [ 1, 2, 3, 7, 8, 9 ] 覆盖
var b = extend(true, obj1, obj2)  // copyIsArray 是数组  src不是
console.log(b) // { value: [ 5, 6, 7 ] } 此时obj1 也就是target也是 === b
// var c = extend(true, obj2, obj1) // clone = src {}
// console.log(c) // { value: { '3': 1 } }
