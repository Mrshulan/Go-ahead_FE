function compose () {
  var args = arguments
  var start = args.length - 1

  return function () {
    var i = start
    var result = args[start].apply(this, arguments)

    while(i--) result = args[i].call(this, result)

    return result
  }
}
// // 利用reduce
// function compose(...funcs) {
//   if(funcs.length === 0) {
//     return arg => arg
//   }

//   if(funcs.length === 1) {
//     return funcs[0]
//   }

//   return funcs.reduce((a, b) => (...args) => a(b(...args)))
// }


// var toUpperCase = function(x) {return x.toUpperCase()}
// var hello = function(x) {return 'Hello, ' + x}

// var f = compose(hello, toUpperCase)
// console.log(f("jimmie"))



/* 
pointfree模式
Pointfree 的本质就是使用一些通用的函数，组合出各种复杂运算。
上层运算不要直接操作数据，而是通过底层函数去处理。即不使用所要处理的值，只合成运算过程。
pointfree 模式能够帮助我们减少不必要的命名，让代码保持简洁和通用，更符合语义，更容易复用，测试也变得轻而易举。
*/

function curry(fn, args) {
  var length = fn.length

  args = args || []
  return function () {
    var _args = args.slice(0)
    var arg, i = 0

    for(;i < arguments.length;i++) {
      arg = arguments[i]
      _args.push(arg)
    }

    if(_args.length < length) {
      return curry.call(this, fn, _args)
    } else {
      return fn.apply(this, _args)
    }
  }
}

// 需求输入 "kevin daisy kelly" 返回后'K.D.K'
var getHead = function (str) { return str.slice(0, 1)}
var toUpperCase = function (str) { return str.toUpperCase() }

// 非pointfree模式 因为提及到了数据
// var initials = function (name) {
//   return name.split(' ').map(compose(toUppercase,head)).join('.')
// }


// pointfree模式 先定义基本运算
var split = curry(function (separator, str) { return str.split(separator)} )
var map = curry(function (fn, arr) { return arr.map(fn)})
var join = curry(function (separator, arr) { return arr.join(separator) })

var initials = compose(join(','), map(compose(compose(toUpperCase, getHead))), split(' '))
// console.log(initials("kevin daisy kelly"))



var data = {
  result: "SUCCESS",
  tasks: [
      {id: 104, complete: false,            priority: "high",
                dueDate: "2013-11-29",      username: "Scott",
                title: "Do something",      created: "9/22/2013"},
      {id: 105, complete: false,            priority: "medium",
                dueDate: "2013-11-22",      username: "Lena",
                title: "Do something else", created: "9/22/2013"},
      {id: 107, complete: true,             priority: "high",
                dueDate: "2013-11-22",      username: "Mike",
                title: "Fix the foo",       created: "9/22/2013"},
      {id: 108, complete: false,            priority: "low",
                dueDate: "2013-11-15",      username: "Punam",
                title: "Adjust the bar",    created: "9/25/2013"},
      {id: 110, complete: false,            priority: "medium",
                dueDate: "2013-11-15",      username: "Scott",
                title: "Rename everything", created: "10/2/2013"},
      {id: 112, complete: true,             priority: "high",
                dueDate: "2013-11-27",      username: "Lena",
                title: "Alter all quuxes",  created: "10/5/2013"}
  ]
};
// 模拟取数据
var fetchData = function() {
  return Promise.resolve(data)
}
// 定义基本函数
// 取键值
var prop = curry(function(name, obj) {
  return obj[name]
})
// 判断键值对是否相等
var propEq = curry(function(name, val, obj) {
  return obj[name] === val
})
// filter数据
var filter = curry(function (fn, arr) {
  return arr.filter(fn)
})
// 遍历
var map = curry(function(fn, arr) {
  return arr.map(fn)
})
// 挑选键值
var pick = curry(function (args, obj) {
  var result = {}
  for(var i = 0;i < args.length;i++) {
    result[args[i]] = obj[args[i]]
  }
  return result
})
// 排序
var sortBy = curry(function(fn, arr) {
  // fn 是 prop（‘dueDate’） arr是数组包对象[{},{}] fn执行的时候取值 a比较
  return arr.sort(function(a, b) {
    var a = fn(a), b = fn(b)
    return a < b ? -1 : a > b ? 1 : 0
  })
})
// 一个目的多个步骤 一一屡屡思路 值是怎么传递的
var getInCompleteTaskSummaries = function (membername) {
  return fetchData()
    .then(prop('tasks'))
    .then(filter(propEq('username', membername)))
    .then(filter(propEq('complete', false)))
    .then(map(pick(['id', 'dueDate', 'title','priority'])))
    .then(sortBy(prop('dueDate')))
    .then(console.log)
    .catch(err => {
      console.log(err)
    })
}
// 但是从右向左执行更加能够反映数学上的含义。也可以自己写从左到右 ramda.js提供了一个R.pipe函数
var getInCompleteTaskSummaries = function(membername) {
  return fetchData()
    .then(
      compose(
        console.log,
        sortBy(prop('dueDate')),
        map(pick(['id','dueDate','title','priority'])),
        filter(propEq('complete', false)),
        filter(propEq('username', membername)),
        prop('tasks')
      )
    )
    .catch(err => {
      console.log(err)
    })
}


getInCompleteTaskSummaries("Scott")
