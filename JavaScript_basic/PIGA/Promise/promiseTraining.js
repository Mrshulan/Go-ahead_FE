/* // 题目一
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})

promise.then(() => {
  console.log(3)
})
console.log(4) */

/* // 题目二
const promise = new Promise((resolve, reject) => {
  // return 'success1'
  resolve('success1')
  reject('error')
  resolve('success2')
  console.log('还是会执行的代码')
})
console.log(promise)
promise.then(res => {
  // 如果promise提前return不会执行 因为 promise一直是pending状态 源码很清楚
  console.log(res)
  return 1 //  let x = onFulfilled(res) 然后resolvePromise
  // resolve(1) // let x = onFulfilled(res) 当然是 catch里边 resolve is not defined 
})
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log("catch: ",err)
}) */


/* // 题目三
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log) // 1
// onFulfilled不是函数 直接值穿透 都不管啥的 */


/* // 题目四 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？
function red() {
  console.log('红灯亮')
}
function green() {
  console.log('绿灯亮')
}
function yellow() {
  console.log('黄灯亮')
}
// -> 思路
// 意思就是3秒，执行一次 red 函数，2秒执行一次 green 函数，1秒执行一次 yellow 函数
// Promise.resolve()成功态 then 递归实现

let lightControl = function (time, cb) {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      cb()
      resolve()
    }, time)
  })
}

let step = function () {
  Promise.resolve()
    .then(function() {
      return lightControl(1000, yellow)
    })
    .then(function () {
      return lightControl(2000, green)
    })
    .then(function () {
      return lightControl(3000, red)
    })
    .then(function() {
      step()
    })
}

step() */


/* // 题目5: 实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中
let timeout = ms => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, ms)
})

let ajax1 = () => timeout(2000).then(() => {
  console.log(1)
  return 1;
})

let ajax2 = () => timeout(1000).then(() => {
  console.log(2)
  return 2;
})
let ajax3 = () => timeout(2000).then(() => {
  console.log(3)
  return 3;
})

let mergePromise = ajaxArray => {
  let data = []
  let sequence = Promise.resolve()

  // 只靠 array.forEach 方法的回调函数是不能保证顺序的
  // 关键在于回调函数里对 sequence 重新赋值的写法，
  // 使得数组中的 item，执行完一个之后再执行一个，才保证时序的
  // -> 也就是then延迟了执行时间 下一个eventloop
  ajaxArray.forEach(function (item) {
    // 第一个then是每个函数传进去 Promise的then会处理Promise类型
    // 第二个then是接受每个ajax的返回值 push
    sequence = sequence.then(item).then(function (res) {
      data.push(res)
      return data
    })
  })

  return sequence
}
// 遍历结束后，返回一个 Promise，也就是 sequence， 他的 [[PromiseValue]] 值就是 data，
// 而 data（保存数组中的函数执行后的结果） 也会作为参数，传入下次调用的 then 方法中。
mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done")
  console.log(data)
}) */


// 题目6: 并发请求 每次三次图片请求 要求尽可能快速将所有图片下载完成

// 
// -> [1,2,3,4,5,6,7,8] -> limitArray[1,2,3] 候补[4,5,6,7,8] 
// reduce候补arr 前边race返回第一个完成的就立刻替换开始下一次的候补替换


let urls = [
  "http://www.mrshulan.xin:6001/category/1.webp",
  "http://www.mrshulan.xin:6001/category/2.webp",
  "http://www.mrshulan.xin:6001/category/3.webp",
  "http://www.mrshulan.xin:6001/category/4.webp",
  "http://www.mrshulan.xin:6001/category/5.webp",
  "http://www.mrshulan.xin:6001/category/6.webp",
  "http://www.mrshulan.xin:6001/category/7.webp",
  "http://www.mrshulan.xin:6001/category/8.webp",
]

function loadImg(url) {
  return new Promise((resolve, reject) => {
    // node环境会报错 Image is not defined 可自行嵌入浏览器测试
    const img = new Image()

    img.onload = function () {
      console.log('一张图片加载完成')
      resolve()
    }
    img.onerror = reject

    img.src = url
  })
}


function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls)
  let promises = []

  // splice返回删除的
  promsies = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 用于后面Promise.race 快速返回成功的 进行替换继续
      return index
    })
  })

  // 利用数组的reduce方法以队列的形式执行
  return sequence.reduce((prev, url) => {
    
    return prev.then(() => {
      return Promise.race(promises)
    }).catch(err => {
      // 更重要的是防止中断整个链式调用
      console.error(err)
    })
    .then(res => {
      // 用新建立的Promise替换掉最快改变状态的Promise 
      promises[res] = handler(url).then(() => {
        return res
      })
    })
  }, Promise.resolve()).then(() => {
    return Promise.all(promises)
  })

}

limitLoad(urls, loadImg, 3).then((data) => {
  console.log(data) // [0, 1, 2]
  console.log("所有图片加载完成")
}).catch(err => {
  console.error(err)
})

