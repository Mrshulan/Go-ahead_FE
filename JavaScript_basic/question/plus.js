// plus(0).toString()  0
// plus(1)(1)(2)(3)(5).toString() 12
// plus(1)(4)(2)(3).toString()  10

var plus = (function () {
  let arg = []

  function _plus(num) {
    arg.push(num)

    return arguments.callee
  }

  _plus.toString = function () {
    var sum = 0

    arg.forEach(item => {
      sum += item
    })
    
    return sum
  }
  
  return _plus
})()

console.log(plus(1)(4)(2)(3).toString())

