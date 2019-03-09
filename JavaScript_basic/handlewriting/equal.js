var toString = Object.prototype.toString

function isFunction (obj) {
  return toString.call(obj) === '[object Function]'
}

// 只要有一项不满足就直接gg return false
function eq(a, b, aStack, bStack) {
  // +0 -0 +Infinity -Infinity 同时也可以搞定一些基本类型(=== 加上a!==0)
  if(a === b) return a !== 0 || 1 / a === 1 /b
  // typeof null 的结果是object 尽早退出函数
  if(a == null || b == null) return false
  // 判断NaN相等
  if(a !== a) return b !== b
  // 如果参数a 是基本类型 直接返回false 不写typeof b!== 'function'是为了更早退出
  var type = typeof a
  if(type !== 'function' && type !== 'object' && typeof b!== 'object') return false

  return deepEq(a, b, aStack, bStack)
}

function deepEq(a, b, aStack, bStack) {
  var className = toString.call(a)
  if(className != toString.call(b)) return false

  switch(className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b
    case '[object Number]':
     if(+a !== +a) return +b !== +b
     return +a === 0 ? 1 / +a === 1 / b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
  }

  var areArrays = className === '[object Array]'

  if(!areArrays) {
    // 过滤掉a,b都是 两个函数的情况(之前的尽早退出)
    if(typeof a !== 'object' || typeof b !== 'object') return false

    var aCtor = a.constructor
    var bCtor = b.constructor
    // 因为默认 constructor 就是Object函数
    // 所以如果 aCtor 是函数，并且 aCtor instanceof aCtor 就说明 aCtor 是 Object 函数
    // 存在且 aCtor bCtor不相等 并且都不是 Object构造函数 那就不相等拉
    if(aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor &&
    isFunction(bCtor) && bCtor instanceof bCtor) && 
    (constructor in a && constructor in b))  {
      return false
    }
  }

  // 栈区缓存已经比对过的值
  var aStack = aStack || []
  var bStack = bStack || []
  var length = aStack.length
  // 检查是否有循环引用的部分
  while(length--) {
    if(aStack[length] === a) {
      return bStack[length] === b
    }
  }
  // 每一次传进来的对象
  aStack.push(a)
  bStack.push(b)

  if(areArrays){
    length = a.length
    if(length !== b.length) return false

    while(length--) {
      if(!eq(a[length], b[length], aStack, bStack)) return false
    }
  } else {
    var keys = Object.keys(a)
    var key

    length = keys.length
    if(Object.keys(b).length !== length) return false

    while(length--) {
      key = keys[length]
      if(!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false
    }

    return true
  }

  // eq完毕后 把这个从栈区移除
  aStack.pop()
  bStack.pop()
}

console.log(eq({name: "shulan"}, {name: "shulan"}))
