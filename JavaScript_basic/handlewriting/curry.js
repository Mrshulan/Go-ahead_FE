function curry(fn, args) {
  var length = fn.length
  // 累计传入的参数
  args = args || []

  return function() {
    var _args = args.slice(0)
    var arg, i = 0

    for(;i < arguments.length;i++) {
      arg = arguments[i]
      _args.push(arg)
    }

    if(_args.length < length) {
      return curry.call(this, fn, _args)
    } else {
      return fn.apply(this, _args)
    }
  }
}

var fn = curry(function(a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c")// ["a", "b", "c"]
console.log(fn("a"))



// 增强版 自己设置满足多少个传值作为标准
function curry(fn, minArg) {  
  if(minArg === undefined) minArg = 1

  function f(fArg) {

    return function() {
      var arg = [].slice.call(arguments)
      var newArg = fArg.concat(arg)

      if(newArg.length >= minArg) {
        return fn.apply(null, newArg)
      } else {
        return f(newArg)
      }
    }
  }

  return f([])
}