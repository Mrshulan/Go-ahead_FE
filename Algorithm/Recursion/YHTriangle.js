// 递归
// 1

// 1 1

// 1 2 1

// function fun(i, j) {
//   if(j === 1 || i === j ) return 1
//   return fun(i - 1, j) + fun(i - 1, j - 1)
// }

// for(var i = 1; i <= 3;i++) {
//   var row = ''
//   for(var j = 1; j <= i ;j++) {
//     row += fun(i, j) + ' '
//   }
//   console.log(row + '\n')
// }


// 非递归[[1], [1, 1], [1, 2, 1]]
function fun(n) {
  var result = []

  for(var i = 0;i < n; i++) {
    result[i] = []
  }

  for(var i = 0;i < n;i++) {
    for(var j = 0;j <= i;j++) {

      if(j === 0 || j === i) {
        result[i][j] = 1
      } else {
        result[i][j] = result[i - 1][j] + result[i - 1][j - 1]
      }
    }
  }

  return result
}

console.log(fun(3))




