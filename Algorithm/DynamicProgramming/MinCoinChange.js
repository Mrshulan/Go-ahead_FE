class MinCoinChange {
  constructor(coins) {
    this.coins = coins
    this.cache = {}
  }

  makeChange(amount) {
    if(!amount) return []

    if(this.cache[amount]) return this.cache[amount]

    let min = [],newMin, newAmount

    // dp[amount] = dp[newAmount] + 1(次数)
    // dp[amount] = min(dp[amount], dp[newAmount] + 1)
    this.coins.forEach(coin => {
      newAmount = amount - coin
      if(newAmount >= 0) {
        // 新的解返回的结果
        newMin = this.makeChange(newAmount)
      }

      // newMin.length + 1 < min.length 如果新的解比老的解 次数（length）更少
      if(newAmount >= 0 &&
        (newMin.length + 1 < min.length || !min.length) && 
        (newMin.length || !newAmount)) {
          min = [coin].concat(newMin)
        }
    })

    return this.cache[amount] = min
  }
}

const minCoinChange = new MinCoinChange([1, 3, 4])
console.log(minCoinChange.makeChange(6)) // [3, 3]
const minCoinChange1 = new MinCoinChange([1, 5 , 10 , 25])
console.log(minCoinChange1.makeChange(36)) // [ 25, 10, 1 ]

// 最少硬币找零的解决方案是找到dp[n]所需的最小硬币数。但要做到这一点，
// 首先得找到对每个 dp[x] < dp[n] 的解。然后，我们将解建立在更小的值的解的基础上