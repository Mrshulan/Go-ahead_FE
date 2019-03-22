function repeat(func, times, wait) {  

  const repeatCol = (func, content, wait) => {

    return new Promise((resolve) => {
      setTimeout((resolve) => {
        func(content)
        resolve()
      }, wait, resolve)
    })
  }

  return (content) => {
    let step = Promise.resolve()
  
    for(var i = 0;i < times;i++) {
      step = step.then(() => repeatCol(func, content, wait))
    }
  }
}




// function repeat (func, times, wait) {
//   const repeatCol = (wait) => {
//     return new Promise(res => {
//       setTimeout(res, wait)
//     })
//   }
//   return async function (...args) {
//     for(var i = 0;i < times;i++) {
//       func.apply(null, args)

//       await repeatCol(wait)
//     }
//   }
// }


// 输入
let repeatFunc = repeat(console.log, 4, 3000)

// 输出
// 会alert4次 helloworld, 每次间隔3秒
repeatFunc('hellworld');
// 会alert4次 worldhellp, 每次间隔3秒
repeatFunc('worldhello')




