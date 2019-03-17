/*
 * Promise 实现 遵循promise/A+规范
 * Promise/A+规范译文:
 * https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4
 */


/*
*  每个then方法都返回一个新的Promise对象（原理的核心）
*  如果then方法中显示地返回了一个Promise对象就以此对象为准，返回它的结果
*  如果then方法中返回的是一个普通值（如Number、String等）就使用此值包装成一个新的Promise对象返回。
*  如果then方法中没有return语句，就视为返回一个,用Undefined包装的Promise对象
*  如果then方法中出现异常，则调用失败态方法（reject）跳转到下一个then的onRejected
*  如果then方法没有传入任何回调（也就是说传入的不是方法函数），则继续向下传递（值的传递特性）<-值的穿透。
 */


const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise (excutor) {
  const that = this
  that.status = PENDING
  that.value = undefined
  that.reason = undefined

  that.onFulfilledCallbacks = []
  that.onRejectedCallbacks = []

  function resolve(value) {
    if(value instanceof Promise) {
      return value.then(resolve, reject)
    }

    // 为什么resolve 加setTimeout?
    // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
    // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，
    // 且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。(microtask)))
    setTimeout(() => {
      // 调用resolve 回调对应onFulfilled函数cb
      if(that.status === PENDING) {
        // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
        that.status = FULFILLED
        that.value = value

        that.onFulfilledCallbacks.forEach(cb => cb(that.value))
      }
    })
  }

  function reject(reason) {
    setTimeout(() => {
      // 调用reject 回调对应onRejected函数
      if(that.status === PENDING) {
        // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
        that.status = REJECTED
        that.reason = reason

        that.onRejectedCallbacks.forEach(cb => cb(that.reason));
      }
    })
  }

  // 捕获在excutor执行器中抛出的异常
  try{
    excutor(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 * @param  {function} onFulfilled fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} newPromsie  返回一个新的promise对象
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  let newPromise

  // 处理参数默认值 保证参数后续能够继续执行
  // 如果类型不是函数需要忽略，同时也实现了透传
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; }
/* 
  then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
  原因:
  其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行
  (且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
  其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.
  （当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，
  则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

  其二 2.2.6规范 也是resolve函数里加setTimeout的原因
  总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

  如下面这种情景 多次调用p1.then
  p1.then((value) => { // 此时p1.status 由pending状态 => fulfilled状态
      console.log(value); // resolve
      // console.log(p1.status); // fulfilled
      p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑
                              所以我们也要确保判断里面onFuilled异步执行
          console.log(value); // 'resolve'
      });
      console.log('当前执行栈中同步代码');
  })
  console.log('全局执行栈中同步代码'); */
  
  if(that.status === FULFILLED) {
    return newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try{
          let x = onFulfilled(that.value) // 用resovle的值进行then的成功方法
          resovlePromise(newPromise, x, resolve, reject) // 新的promise resolve 上一个onFulfilled的返回值检查
        } catch(e) {
          reject(e) // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected)
        }
      })
    })
  }

  if(that.status === REJECTED) {
    return newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try{
          let x = onRejected(that.reason)
          resolvePromise(newPromise, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    })
  }

  if(that.status === PENDING) {
    // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
    return newPromise = new Promise((resolve, reject) => {
      // resolve函数里边保持了that (似乎每次都是保持上一个， 而且队列只有一个而已)
      that.onFulfilledCallbacks.push((value) => {
        try{
          let x = onFulfilled(value)
          resolvePromise(newPromise, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })

      that.onRejectedCallbacks.push((reason) => {
        try {
            let x = onRejected(reason)
            resolvePromise(newPromise, x, resolve, reject)
        } catch(e) {
            reject(e)
        }
      })
    })
  }
}

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */

function resolvePromise(promise2, x,resolve, reject) {
  if(promise2 = x) {
    return reject(new TypeError('循环引用'))
  }

  // 反之thenable链式自己
  let called = false

  // promise对象
  if(x instanceof Promise) {
    if(x.status === PENDING) {
      x.then(y => {
        resovlePromise(promise2, y, resolve, reject)
      }, reason => {
        reject(reason)
      })
    } else {
      x.then(resolve, reject)
    }
  // thenable对象
  } else if(x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try{
      let then = x.then
      if(typeof then === 'function') {
        then.call(x, y=> {
          if(called) return 
          called = true
          resovlePromise(promise2, y, resolve, reject)
        }, reason => {
          if(called) return
          called = true
          reject(reason)
        })
      // 说明是一个普通对象/函数
      } else {
        resovle(x)
      }
    } catch(e) {
      if(called) return
      called = true
      reject(e)
    }
  // 基本类型 
  } else {
    resolve(x)
  }
}

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

/**
 * Promise.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 */

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let done = gen(promises.length, resolve)
    promises.forEach((promise, index) => {
      promise.then((value) => {
        done(index, value)
      }, reject)
    })
  })
}

function gen(length, resolve) {
  let count = 0
  let values = []

  return function (i, value) {
    values[i] = value
    if(++count === length) {
      resolve(values)
    }
  }
}

/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      // 一旦有个resolve成功态就不可变了 相比 gen方法 gen方法是做了一个限制
      // resolve在 return new Prmoise()里边 是决定他的成功态 then里边是 return传值，
      promise.then(resolve, reject)
    })
  })
}


Promise.resolve = function (value) {
  return new Promise(resolve => {
    resolve(value)
  })
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}


/**
 * 基于Promise实现Deferred的
 * Deferred和Promise的关系
 * - Deferred 拥有 Promise
 * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）
 * 参考jQuery.Deferred
 * url: http://api.jquery.com/category/deferred-object/
 */

 Promise.deferred = function () {
   let defer = {}
      defer.promise = new Promise((resolve, reject) => {
      defer.resolve = resolve
      defer.reject = reject
   })
  return defer
 }

 /**
 * Promise/A+规范测试
 * npm i -g promises-aplus-tests
 * promises-aplus-tests PromiseA.js
 */

// try {
//   module.exports = Promise
// } catch (e) {
// }