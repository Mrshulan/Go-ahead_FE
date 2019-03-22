function restArgs (func, startIdnex) {
  // ==  🙂 有意思
  startIndex = startIndex == null ? func.length - 1 : +startIdnex

  return function () {
    // 如果实际传参比预设参数少的时候 length 就是负数了
    // var startIndex = func.length - 1
    // var length = arguments.length - startIndex
    var length = Math.max(arguments.length -startIndex, 0)

    var rest = Array(length)
    var index = 0

    for(;index < length;index++) {
      rest[index] = arguments[index + startIndex]
    }

    var args = Array(startIndex + 1)
    for(index = 0; index < startIndex + 1; i++) {
      args[index] = arguments[index]
    }

    // args [1, 2, [3, 4, 5]]
    args[startIndex] = rest

    return func.apply(this, args)
  }
}