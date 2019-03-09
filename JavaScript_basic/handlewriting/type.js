var classtype = {}
var toString = classType.toString
var hasOwn = classtype.hasOwnProperty

'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(item => {
  classtype['[object ' + item + "]"] = item.toLowerCase()
})

function type (obj) {
  // null undefined在ie6中会toString [object Object]
  if(obj == null) {
    return obj + ''
  }

  return typeof obj === 'object' || typeof obj === 'function' ?
    classtype[toString.call(obj)] || 'object' :
    typeof obj
}

function isFunction (obj) {
  return type(obj) === 'function'
}

var isArray = Array.isArray || function (obj) {
  return type(obj) === 'array'
}

function isPlainObject(obj) {
  var proto, Ctor

  if(!obj || toString.call(obj) !== "[object Object]"){
    return false
  }
  proto = Object.getPrototypeOf(obj)
  if(!proto) return true

  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
  // Object构造函数 在 equal.js里边有涉及到  是函数且是object构造函数
  return typeof Ctor === 'function' && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
}

function isEmptyObject(obj) {
  var name

  for(name in obj) {
    return false
  }

  return true
}

// obj.self === obj.window 
function isWindow(obj) {
  return obj != null && obj === obj.window
}

function isArrayLike (obj) {
  var length = !!obj && 'length' in obj && obj.length
  var typeRes = type(obj)

  // 排除函数window对象的干扰
  if(typeRes === 'function' || isWindow(obj)) {
    return false
  }

  /* 
    数组 长度为0 length>0 最后一项存在
  */
  return typeRes === 'array' || length === 0 ||
    typeof  length === 'number' && length > 0 && (length - 1) in obj
}

function isElement(obj) {
  return !!(obj && obj.nodeType === 1)
}