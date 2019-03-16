function create(Con, ...args) {
  let obj = {}
  Object.setPrototypeOf(obj, Con.prototype)
  let result = Con.apply(obj, args)
  return result instanceof Object ? result : obj
}

// function Test(name, age) {
//   this.name = name
//   this.age = age
// }
// Test.prototype.sayName = function () {
//     console.log(this.name)
// }
// const a = create(Test, 'shulan', 20)
// console.log(a.name) // 'shulan'
// console.log(a.age) // 20
// a.sayName() // 'shulan'


Function.prototype.myCall = function (context) {
  context = context ? Object(context) : window
  context.fn = this

  let args = [...arguments].slice(1)
  let result = context.fn(...args)

  delete context.fn
  return result
}

Function.prototype.myApply = function (context, arr) {
  context = context ? Object(context) : window
  context.fn = this

  let result
  if(!Array.isArray(arr)) {
    result = context.fn()
  } else {
    result = context.fn(...arr)
  }

  delete context.fn
  return result
}



// Function.bind.prototype -> undefined
// 一般
Funciton.prototype.bind = function (context) {
  let self = this
  let arg = [...arguments].slice(1)

  return function () {
    let newArg = [...arguments]
    return self.apply(context,arg.concat(newArg))
  }
}

// 更应该注意的是
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
// 也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function () {}
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(this instanceof fNOP ?  this : context, args.concat(bindArgs))
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  // fBound.prototype.constructor = this 可加可不加 instanceof 左侧取的是__proto__
  return fBound
}


