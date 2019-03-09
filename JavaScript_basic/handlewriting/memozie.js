// 如果需要大量重复的计算，或者大量计算又依赖于之前的结果

// underscore
var memozie = function(func, hasher) {
  var memozie = function (key) {
    var cache = memozie.cache
    var address = '' + (hasher ? hasher.apply(this, arguments) : key)

    if(!cache[address]) {
      cache[address] = func.apply(this, arguments)
    }

    return cache[address]
  }

  memozie.cache = {}
  return memozie
}
// 默认使用函数的第一个参数作为key
var add = function(a, b, c) {
  return a + b + c
}

var memoizedAdd = memozie(add)

memoizedAdd(1, 2, 3) // 6
memoizedAdd(1, 2, 4) // 6

// 如果要支持多参函数， 传入hasher函数,自定义key 通常JSON.stringify
var memozieAdd = memozie(add, function() {
  var args = Array.prototype.slice.call(arguments)

  return JSON.stringify(args)
})