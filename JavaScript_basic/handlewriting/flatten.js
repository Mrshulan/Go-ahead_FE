var arr = [1, [2, [3, 4]]]

function flatten (arr) {
  var result = []
  for(var i = 0,iL = arr.length;i < iL;i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flattn(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}


// 局限性很大 即便是 '1' 也会改变成1  扁平化是不改变数据类型的
function flatten(arr) {
  return arr.toString().split(',').map(function (item) {
    return +item
  })
}

function flatten(arr) {
  return arr.reduce(function(prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}


function flatten(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}


/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否过滤非数组元素
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */

 function flatten(input, shallow, strict, output) {
    // 递归的时候用到的output 反正都是引用
    output = output || []
    var idx = output.length

    for(var i = 0,iL = input.length;i < iL;i++) {
      var value = input[i]

      if(Array.isArray(value)) {
        if(shallow) {
          var j = 0, length = value.length
          while(j < length) {
            output[idx++] = value[j++]
          }
        } else {
          flatten(value, shallow, strict, output)
          idx = output.length
        }
      } else if(!strict) {
        // 是否过滤非数组
        output[idx++] = value
      }
    }

   return output
 }

 var arr = [1, 2, [3, 4]];
 console.log(flatten(arr, true, true)); // [3, 4]
 // shallow true + strict false ：正常扁平一层
 // shallow false + strict false ：正常扁平所有层
 // shallow true + strict true ：去掉非数组元素
 // shallow false + strict true ： 返回一个[] 因为你不shallow 迭代肯定都是被strict剔除的
