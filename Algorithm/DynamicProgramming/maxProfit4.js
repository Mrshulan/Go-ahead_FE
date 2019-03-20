// 如果k大于给定的数组数量，就意味着可以尽可能多的买卖


/* 

输入: [3,2,6,5,0,3], k = 2
输出: 7
解释: 在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 
这笔交易所能获得利润 = 6-2 = 4 。
随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出,
这笔交易所能获得利润 = 3-0 = 3

注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票） 这句话就决定了 买 和 卖两个动作


// 动规两部曲 
首先找状态定义，简单的dp[i]并不能满足要求，
因为有买卖两种形式，所以我们应该设置两个状态定义buy[i]和sell[i],i <= k

假设初始总金额(利润)为0，这里直接用dp[0][i]来表示在某天买入第i次后的总金额(可能会是负数)，
用dp[1][i]表示在某天卖出第i次后的总金额


然后确立状态转移方程：
在某天买入第i次，应该是上次卖出后的总金额减去当天股票价格p和上次买入后的总金额的最大值
即dp[0][i] = Math.max(dp[0][i], (i ? dp[1][i - 1] : 0) - p)
而在某天卖出第i次，应该是上次买入后的总金额加上当天股票价格p和上次卖出后的总金额的最大值
即dp[1][i] = Math.max(dp[1][i], dp[0][i] + p);

动规这种子问题之间的关系 真的需要好好 打量打量
 */

var maxProfit = function (k, prices) {
  if(prices.length <= 1 || k <=0) return 0

  // k 大于 长度的一半 就直接 贪心了 maxProfit1 问题
  if(prices.length/2 <= k) {
    let maxProfit = 0

    for(let i = 1;i < prices.length;i++) {
      if(prices[i] > prices[i - 1]) {
        maxProfit += (prices[i] - prices[i-1])
      }
    }

    return maxProfit
  }

  let dp = []

  for(let i = 0;i < 2;i++) {
    for(let j = 0;j < k;j++) {
      if(i === 0) {
        dp[i][j] = -Infinity
      } else {
        dp[i][j] = 0
      }
    }
  }

  for(let i = 0;i < prices.length;i++) {
    let p = prices[i]

    for(let j = 0;j < Math.min(i + 1, k); j++) {

      // 买入动作
      dp[0][j] = Math.max(db[0][j], (j ? db[1][j - 1] : 0) - p)
      // 卖出动作
      dp[1][j] = Math.max(dp[1][j], dp[0][j] + p) || 0
    }
  }

  return dp[1].pop()
}

