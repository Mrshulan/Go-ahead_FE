/* 
async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await
（1）内置执行器。
Generator 函数的执行必须靠执行器，所以才有了co模块，
而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样.
（2）更好的语义。
async和await，比起星号和yield，语义更清楚了。
async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
（3）更广的适用性。
co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，
而async函数的await命令后面，
可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
（4）返回值是 Promise。
async函数的返回值是 Promise 对象，
这比 Generator 函数的返回值是 Iterator 对象方便多了。
你可以用then方法指定下一步的操作 


thunk函数指的是能将执行结果传入回调函数，并将该回调函数返回的函数
var readFile = function (fileName) {
    return function (callback) {
        return fs.readFile(fileName, callback)
    }
}
readFile('./package.json')((err, str) => {
    console.log(str.toString())
})
能将异步操作返回结果的获取权交给thunk函数的返回值，
而不是将异步操作结果传入thunk函数本身的作用域内，这点很重要，
因为它能结合Generator语法让Generator函数自动执行

async函数返回一个 Promise对象，可以使用then方法添加回调函数。当函数执行的时候，
一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
*/


async function fn(args) {
  // ...
}

// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}

// 基本就是Generator run自执行的的翻版
function spawn(getF) {
  return new Promise(function (resolve, reject) {
    const gen = getF()

    function step(nextF) {
      let next

      try{
        next = nextF()
      } catch (e) {
        return reject(e)
      }

      if(next.done) {
        return resolve(next.value)
      }

      Promise.resolve(next.value).then(
        function (v) {
          step(function() {
            return gen.next(v)
          })
        },
        function (e) {
          step(function () {
            return gen.throw(e)
          })
        }      
      )
    }

    step(function () {
      return gen.next(undefined)
    })
  })
}