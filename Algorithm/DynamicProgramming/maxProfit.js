/**
 * @param {number[]} prices
 * @return {number}
 */

 
var maxProfit = function (prices) {
  var max = 0 // 最大利润
  var cur = 0 // 当前利润
  var index = 0 // 买入当天
  
  // i 表示卖出当天
  for(var i = 1;i < prices.length;i++) {
    cur = prices[i] - prices[index]
    // 首先得保障卖出大于买入才去 试探更新
    if(cur > 0) {
      if(cur > max) {
        max = cur
      } 
    // 否则就亏损,跟新买入天数 从卖出当天买入重新开始计算
    } else {
      index = i
    }
  }

  return max
}