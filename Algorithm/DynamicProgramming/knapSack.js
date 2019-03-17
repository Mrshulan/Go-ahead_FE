var values = [3, 4, 5]
var weights = [2, 3, 4]
var capacity = 5
var n = values.length

function knapSack(capacity, weights, values, n) {
  var i,w,a,b, kS = []

  // 取等号 初始化 二维数组 
  for(i = 0;i <= n;i++) {
    kS[i] = []
  }

  // 取等号的好处
  for(i = 0;i <= n;i++) {
    for(w = 0;w <= capacity;w++) {
      // 初始化第一行第一列
      if(i === 0 || w === 0) {
        kS[i][w] = 0
        // 若是当前重量 小于等于当前 背包capacity 说明可以装
      } else if(weights[i - 1] <= w) {
        // a -> 当前重量价格 + 上一行互补的重量
        a = values[i - 1] + kS[i - 1][w - weights[i - 1]]
        // 上一排该数
        b = kS[i - 1][w]
        // 动规核心比较
        kS[i][w] = a > b ? a : b
      } else {
        // 不能装直接取上一排
        kS[i][w] = kS[i - 1][w]
      }
    }
  }

  return kS[n][capacity]
}

console.log(knapSack(capacity, weights, values, n))