// 模拟数据获取
const fetchData = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 1000, 1)
  })
}

const fetchMoreData = (value) => {
  return new Promise(resolve => {
    setTimeout(resolve, 1000, value + 1)
  })
}

const fetchMoreData2 = (value) => {
  return new Promise(resolve => {
    setTimeout(resolve, 1000, value + 2)
  })
}


// Promise实现 then then then 代码调试的时候then是异步 直接就跳下一个
// function fetch() {
//   return (
//     fetchData()
//       .then(value1 => {
//         console.log(value1)
//         return fetchMoreData(value1)
//       })
//       .then(value2 => {
//         console.log(value2)
//         return fetchMoreData2(value2)
//       })
//   )
// }

// asycn await实现 代码调试的时候跟同步代码一样的舒服
// 当我们使用一个变量去接收await的返回值时,如：const temp = await fn();
// 该返回值temp为Promise中resolve出来的值（也就是PromiseValue）
async function fetch() {
  const value1 = await fetchData()
  console.log(value1)
  const value2 = await fetchMoreData(value1)
  console.log(value2)
  return fetchMoreData2(value2)
}

// const res = fetch()
// console.log(res)

// async不恰当的使用 可以并行执行 却偏偏弄成顺序执行
// 示例1
// (async () => {
//   // getList() 和 getAnotherList() 其实并没有依赖关系 多一倍的执行时间 因为await左边要LHS 阻塞
//   const getList = await getList()
//   const getAnotherList = await getAnotherList()
// })()
// -> 所以
// ;(async () => {
//   // 并发？ -> 假设都是返回Promise
//   const listPrmise = getList()
//   const anotherListPromise = getAnotherList()

//   await listPrmise
//   await anotherListPromise
// })();
// // or
// (async () => {
//   Promise.all([getList(), getAnotherList()]).then(data => {})
// })();

// 示例2
// ;(async () => {
//   const listPromise = await getList()
//   const anotherListPromise = await getAnotherList()

//   // do something

//   await submit(listData)
//   await submit(anotherListData)
// })();

// // 1.找出依赖关系
// // submit(listData) 需要在 getList() 之后，
// // submit(anotherListData) 需要在 anotherListPromise()之后

// // -> 依赖的分装放一起
// async function handleList() {
//   const listPromise = await getList()

//   await sumbit(listData)
// }
// async function handleAnotherList() {
//   const anotherListPromise = await getAnotherList()

//   await submit(anotherListData)
// }

// // ->执行并发
// (async () => {
//   // async 返回的都是是Promise对象
//   const handleListPromise = handleList()
//   const handleAnotherListPromise = handleAnotherList()

//   await handleListPromise
//   await handleAnotherListPromise
// })();
// // or
// (async () => {
//   Promise.all([handList(), handleAnotherList()]).then()
// })();



// 继发与并发
// 继发1
// async function loadData() {
//   let res1 = await fetch(url1)
//   let res2 = await fetch(url2)
//   let res3 = await fetch(url3)

//   return "when all done";
// }

// // 继发2
// async function loadData(urls) {
//   for (const url of urls) {
//     const response = await fetch(url)

//     console.log(await response.text())
//   }
// }



// // 并发1
// async function loadData() {
//   var res = await Promise.all([fetch(url1), fetch(url2)], fetch(url3))

//   return "when all done"
// }

// // 并发2
// async function loadData(urls) {
//   // 读取 url
//   const textPromises = urls.map(async url => {
//     const response = await fetch(url)

//     return response.text()
//   })

//   // 按次输出
//   for (const textPromise of textPromises) {
//     console.log(await textPromise)
//   }
// }


// async 简化错误捕获
// 给 await 后的 promise 对象添加 catch 函数
// function to(promise) {
//   return Promise.then(data => {
//     return [null, data]
//   }).catch(err => [err])
// }

// async function asyncTask() {
//   let err, user, savedTask
//   // 错误先传
//   [err, user] = await to(UserModel.findById(1))
//   if(!user) throw new CustomError("No user found")

//   [err, saveTask] = await to(TaskModel({userId: user.id, name:"demo task"}))
//   if(err) throw new CustomError("Error occurred while saving task")

//   if(user.notificationsEnabled) {
//     const [err] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
//     if (err) console.error('Just log the error and continue flow');
//  }
// }

/* 
Generator 和 Async的区别
Generator 本来是用作生成器，使用 Generator 处理异步请求只是一个比较 hack 的用法，
在异步方面，async 可以取代 Generator，
但是 async 和 Generator 两个语法本身是用来解决不同的问题的 

async 函数返回一个 Promise 对象 await返回的就是
面对复杂的异步流程，Promise 提供的 all 和 race 会更加好用
Promise 本身是一个对象，所以可以在代码中任意传递
async 的支持率还很低，即使有 Babel，编译后也要增加 1000 行左右。
*/


var fn = function (time) {
  console.log('开始处理异步')
  setTimeout(function () {
    console.log(time)
    console.log('异步处理完成')
    iter.next()
  }, time)
}

function *g() {
  console.log('start')
  yield fn(3000)
  yield fn(2000)
  yield fn(1000)
  console.log('end')
}

// let iter = g()
// iter.next()


var fn = function (time) {
  return new Promise(function(resolve, reject) {
    console.log('开始处理异步')
    setTimeout(function () {
      resolve(1)
      console.log(time)
      console.log('异步处理完成')
    }, time)
    // return 1
  })
}

var start = async function () {
  console.log('start')
  var a = await fn(0)
  console.log(a + '1')
  var b = await fn(2000)
  console.log(b + '2')
  await fn(3000)
  console.log('end')
  return await fn(1)
}

// console.log(start())

async function async1() {
  console.log('async1 start')

  // var a = await '啥也不是的'
  var a = await async2() // 试探步为假的async
  // var a = await new Promise(function(resolve, reject) {
  //     console.log('是个真的promise')
  //     setTimeout(function() {
  //         resolve('成功')
  //     },4)
  //   })
  // var a = await start() // 试探步为真的async
  // await async2()
  // 如果不是 promise async都不是 , await会阻塞内部后面的代码，先执行async外面的同步代码，同步代码执行完，macrotask宏任务执行完 （其实没多大意义）
  // 再回到async内部，把这个非promise的东西，作为 await表达式的结果 然后在执行外部的 microtask
  // 因为 async函数无论你是否返回promise对象都会给包装成promise.resolve()
  // 所以主要两种情况
  // 如果等到的是一个 promise 对象，await 也会暂停async内后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled， 和外层的setTimeout时间谁先到点
  // 如果后边接的是async这一类返回的promise隐式的 先执行里边的内容(试探步) 看 是真promise还是 假的promise
  // 如果是假的promise会放在这一次的队列的最后 列入microtask的最后面 即便他先遇见
  // 如果是真正直接的promise 会安排到最后才执行 外层的eventloop执行完毕⭐(比方说那个setTimeout位置)
  // 然后把 resolve 的参数作为 await 表达式的运算结果 （虽然是promise 但是可以不用写then直接返回的就是传递的值）
  // 等待外边同步事件处理完成之后在回到里边来继续执行
  console.log(a)
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}



console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 1000)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise then')
})

console.log('script end')