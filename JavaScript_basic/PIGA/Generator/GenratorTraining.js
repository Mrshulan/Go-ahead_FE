var fetch = require('node-fetch')

/* function *foo(x) {
  var y = 2 * (yield (x + 1))
  var z = yield (y / 3)
  return (x + y + z)
}

var a = foo(5);
// console.log([...a]) // [ 6, NaN ]  一旦true就没有后文了 所以二选一
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true} */




/* function *gen() {
  var url = 'https://api.github.com/users/github'
  var result = yield fetch(url)
  console.log(result.bio) // How people build software.
}
// 执行Generator 函数，获取迭代器对象 指向内部状态的指针对象
var g = gen() // Object [Generator] {}

var result = g.next();// { value: Promise { <pending> }, done: false } // fetch立即返回的
result.value.then(function (data) {
  return data.json()
})
.then(function(data) {
  g.next(data) // 为 result = data
}) */


// co模块的模拟
function *gen() {
  var r1 = yield fetch('https://api.github.com/users/github')
  var r2 = yield fetch('https://api.github.com/users/github/followers')
  var r3 = yield fetch('https://api.github.com/users/github/repos')

  console.log([r1.bio, r2[0].login, r3[0].full_name].join('\n'))
}

function run(gen) {
  var g = gen()

  function next(data) {
    var result = g.next(data) // { value: Promise { <pending> }, done: false } 每次next执行都会返回

    if(result.done) return 

    result.value.then(function (data) {
      return data.json()
    }).then(function (data) {
      next(data)
    })

  }

  next()
}

run(gen)
// How people build software.
// remiel
// github/.github  