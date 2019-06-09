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

// 递归+缓存(牺牲空间换时间)
function fun (numRows) {
  var result = []
  var countCache = {}
  
  for(var i = 0; i < numRows;i++) {
    result[i] = []
    for(var j = 0;j <= i;j++) {
      result[i][j] = count(i, j)
    }
  }
  
  return result

  function count(i, j) {

    if(countCache['' + i + j]) {
      return countCache['' + i + j]
    }
    
    if(j === 0 || i === j) return 1
    // 递归表达式    
    return countCache['' + i + j] = count(i - 1, j - 1) + count(i - 1,j)
  } 
}


// 非递归 迭代 [[1], [1, 1], [1, 2, 1]]
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


// 输出指定行 O(k)的空间复杂度 [1] -> [1, 1] -> [ 1, 2, 1] -> [1, 2, 3] -> [1, 3, 3] -> [1, 3, 3, 1]
function fun(n) {
  var result = [1]

  for(var i = 1;i <= n;i++) {
    // 从末尾开始变化
    for(j = result.length - 1;j > 0;j--) {
      result[j] = result[j] + result[j - 1]
    }
    // 添加最后的1
    result = result.concat(1)
  }

  return result
}

console.log(fun(3))




