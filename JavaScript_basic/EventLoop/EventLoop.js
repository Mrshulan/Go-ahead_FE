// https://juejin.im/post/5b0524f8518825428a2631ee
// https://juejin.im/post/59e85eebf265da430d571f89#comment


/* process.nextTick(() => {
  console.log(1)
})

setImmediate(() => {
  console.log(2)
  process.nextTick(() => {
    console.log(3)
  })
})

setImmediate(() => {
  console.log(4)
})

setTimeout(() => {
  console.log(5)
}, 0)

console.log(6)
// -> 6 1 5 2 4 3
*/


/* console.log(1)
setTimeout(function () {
  console.log(2)
  process.nextTick(function () {
    console.log(3)
  })

  new Promise(function (resolve) {
    console.log(4)
    resolve()
  }).then(function () {
    console.log(5)
  })
})

process.nextTick(function() {
  console.log(6)
})

new Promise(function(resolve) {
  console.log(7)
  resolve()
}).then(function () {
  console.log(8)
})

setTimeout(function () {
  console.log(9)
  process.nextTick(function () {
    console.log(10)
  })

  new Promise(function (resolve) {
    console.log(11)
    resolve()
  }).then(function () {
    console.log(12)
  })
})


// 拿笔画一画macro 和 micro队列 (一定要注意是什么时候添加的)
// node -> 1 7 6 8 2 4 9 11 3 10 5 12
// 去掉nextTick node -> 1 7 8 2 4 9 11 5 12
// broswer -> 1 7 8 2 4 5 9 11 12 */




/* let first = () => (new Promise((resolve, reject) => {
  console.log(1)

  let p = new Promise((resolve, reject) => {
    console.log(2)

    setTimeout(() => {
      console.log(3)
      resolve(4)
    })

    resolve(5)
  })

  resolve(6)

  p.then((arg) => {
    console.log(arg)
  })
}))

first().then((arg) => {
  console.log(arg)
})

console.log(7)
// 1 2 7 5 6 3 */





/* var p = Promise.resolve(21)

p.then(function (v) {
  console.log(v)
  return new Promise(function (resolve, reject) {
    resolve(v * 2)
  })
})
.then(function (v) {
  console.log(v)
})
// 21 42 */

// setTimeout setImmediate区别

// setTimeout(() => {
//   console.log(2)
// }, 2)

// setTimeout(() => {
//   console.log(1)
// }, 1)

// setTimeout(() => {
//   console.log(0)
// }, 0)

// ->node中 1 0 2 或者 2 1 0  真是timer玄学
// ->browser中 1 0 2
// https://chromium.googlesource.com/chromium/blink/+/master/Source/core/frame/DOMTimer.cpp#93
// -> double intervalMilliseconds = std::max(oneMillisecond, interval * oneMillisecond); 
// interval无论传入 0 还是 1 行为是一样的 向着浏览器看齐~~~
// HTML 5 规定setTimeout ms最低是4ms 这时间主要是为了给CPU休息时间


// setTimeout(() => {
//   console.log(1)
// })
// setImmediate(() => {
//   console.log(0)
// })

// ->node中 1 0 或者 0 1真是timer玄学
// 你可以放一些 micro tasks 保证setTimeout 到期(时间到准备就绪) 但是这样肯定是不推荐的
// 也就是推迟任务执行的 process.nextTick
// 所以问题的关键在于setTimeout何时到期 (没有到期, poll检索就会直接到check阶段)
// 只有到期的setTimeout才能保证在setImmediate之前执行。 4ms node准备时间的注意点
// 其实大概率还是 4ms 早已经准备好的

// const fs = require('fs')

// fs.readFile('../PIGA/PormiseA.js', () => {
//   setTimeout(() => {
//     console.log('timeout second')
//   })
//   setImmediate(() => {
//     console.log('immediate first')
//   })
// })

// 也可以在I/O callback里边 I/O 无法处理 timer 和check队列 
// -> I/O pending callbacks,执行I / O回调，推迟到下一个循环迭代(一定是按照Node中的 EventLoop)
// -> poll阶段 poll：检索新的I / O事件, 执行I / O相关的回调函数, 适当时节点将在此处阻塞
// readfile回调是在poll中执行 poll队列（空）阶段 发现有 setImmediate ，所以会立即跳到 check 阶段执行回调
// 再去 timer 阶段执行 setTimeout
// 所以以上输出一定是 setImmediate，setTimeout


setImmediate(() => {
  console.log('setImmediate1')
  setTimeout(() => {
    console.log('setTimeout1')
  }, 0)
})

setTimeout(() => {
  process.nextTick(() => {
    console.log('nextTick')
  })
  console.log('setTimeout2')
  setImmediate(() => {
    console.log('setImmediate2')
  })
})

// -> node setTimeout2 nextTick setImmediate1 setImmediate2 setTimeout1
// -> node setImmediate1 setTimeout2 setTimeout1 nextTick setImmediate2
// 大概率还是第一种