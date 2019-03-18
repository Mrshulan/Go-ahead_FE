/* var obj = {
  value: 1 
}

var value = 1

Object.defineProperty(obj, 'value', {
  get: function () {
    return value
  },
  set: function (newValue) {
    // 如果这里设置obj.value = newValue就会陷入死循环 所以都是外边有个value存储
    value = newValue
    console.log(obj)
    document.getElementsByClassName('num')[0].innerHTML = value
  },
  enumerable: true
})

document.getElementById('button').addEventListener('click', function () {
  // set操作
  obj.value += 1
  console.log(value)
}) */


var obj = {
  value: 1
}

// document.getElementById('button').addEventListener('click', function () {
//   obj.value += 1
// })

// ;(function () {
//   function watch(obj, name, func) {
//     var value = obj[name]

//     Object.defineProperty(obj, name, {
//       get: function () {
//         return value
//       },
//       set: function (newValue) {
//         value = newValue
//         func(value)
//       }
//     })

//     if(value) obj[name] = value
//   }

//   this.watch = watch
// })()

// watch(obj, "value", function (newValue) {
//   document.getElementsByClassName("num")[0].innerText = newValue
// })


// Proxy 还是Proxy大法好
;(function () {
  function watch(target, func) {
    var dataProxy = new Proxy(target, {
      get: function(target, prop) {
        return target[prop]
      },
      set: function(target, prop, value) {
        // 这里用的是本身的target所以就没有循环
        target[prop] = value
        // 执行那个函数
        func(prop, value)
      } 
    })

    return dataProxy
  }

  this.watch = watch
})()


// 返回一个代理对象，通过这代理对象去访问
var newObj = watch(obj, function (key, newValue) {
  if(key === "value") {
    document.getElementsByClassName("num")[0].innerText = newValue
  }
})

document.getElementById("button").addEventListener("click", function () {
  newObj.value +=1
})
