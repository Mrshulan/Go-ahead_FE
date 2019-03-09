var t
function foo() {
  if(t) return t
  t = new Date()

  return t
}

var foo = (function() {
  var t 
  return function () {
    if(t) return t
    t = new Date()
    return t
  }
})()

function foo() {
  if(foo.t) return foo.t
  foo.t = new Date()
  return foo.t
}


// 上面的函数要么污染环境 要么每次要进行判断 懒惰函数都没有的
var foo = function () {
  var t = new Date()

  foo = function () {
    return t
  }
  return foo()
}


// 函数兼容的时候
function addEvent(type, el, fn) {
  if(window.addEventListener) {
    addEvent = function (type, el, fn) {
      el.addEventListener(type, fn, false)
    }
  } else if(window.attachEvent) {
    addEvent = function (type, el, fn) {
      el.attachEvent('on' + type, fn)
    }
  }
  // 主动执行才能绑定上事件
  addEvent(type, el, fn)
}

// 闭包
var addEvent = (function () {
  if(window.addEventListener) {
    return function (type,el, fn) {
      el.addEventListener(type, fn, false)
    }
  } else if (window.attachEvent) {
    return function (type, el, fn) {
      el.attachEvent('on' + type, fn)
    }
  }
})()
addEvent()
