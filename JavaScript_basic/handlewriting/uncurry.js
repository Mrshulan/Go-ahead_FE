// 反柯里化 满足鸭子类型 扩大使用性， 
// 非我之物，为我所用
// 增加被反柯里化方法接收的参数

// function Toast(option) {
//   this.prompt = ''
// }

// Toast.prototype = {
//   constructor: Toast,

//   show: function() {
//     console.log(this.prompt)
//   }
// }

// var obj = {
//   prompt: '新对象'
// }

// function unCurrying(fn) {
//   return function () {
//     var args = [].slice.call(arguments)
//     var that = args.shift()

//     return fn.apply(that, args)
//   }
// }

// var objShow = uncurry(Toast.prototype.show);

// objShow(obj); // 输出"新对象"


Function.prototype.uncurry = function () {
  var self = this

  return function () {
    return Function.prototype.call.apply(self, arguments)
  }
}

// var objShow = Toast.prototype.show.unCurrying()
// objShow(obj)


const push = Array.prototype.push.uncurry()
const arr = []
const obj = {length: 5}
push(arr, 1)
push(obj, "自动根据length，push进去 length+1")

console.log(push(obj, 1)) // push 返回新长度
console.log(arr)
console.log(obj)

// Function.prototype.call.apply(self, arguments)

// Function.prototype.call.apply(...)的解析

// 1）可以看成是callFunction.apply(...)。这样，就清晰很多。
// callFunction的this指针，被apply修改为self。
// 然后执行callFunction -> callFunction(arguments)

// 2） callFunction(arguments)的解析

// call方法，第一个参数，是用来指定this的。所以callFunction(arguments) -> callFunction(arguments[0], arguments[1-n])。
// 由此可以得出，反柯里化后，第一个参数，是用来指定this指向的。

// 3）为什么要用apply(self, arguments)
// 如果使用apply(null, arguments)，因为null对象没有call方法，会报错。
