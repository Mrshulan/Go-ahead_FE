var arr = [1, 5, 8, 2, 10]

function max(arr) {
  var result = arr[0]

  for(var i = 1;i < arr.length;i++) {
    result = Math.max(result, arr[i])
  }

  return result
}

function max(arr) {
  return arr.reduce((prev, next) =>  prev > next ? prev : next)
}

arr.sort(function (a, b) { return a - b})


var max = eval('Math.max(' + arr + ')')

Math.max.apply(null, arr)

Math.max(...arr)


// 从函数参数获取的会转化成为一个数组，这个是在函数定义时用到的，称为rest参数。
// 而前面那个（...）又称为扩展运算符，可以将数组转化为参数序列。
function add(...values) {
  let sum = 0;

  for (var val of values) {
  sum += val;
  }

  return sum;
}

add(2, 5, 3)