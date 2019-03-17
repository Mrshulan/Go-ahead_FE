// 贪心算法版本的这个解法很简单。从最大面额的硬币开始，拿尽可能多的这种硬币找零。
// 当无法 再拿更多这种价值的硬币时，开始拿第二大价值的硬币，依次继续
class MinCoinChange {
  constructor(coins) {
    this.coins = coins
  }

  makeChange(amount) {
    const change = []
    let total = 0

    // 如果 a<b 换 从大到小排序
    this.coins.sort((a, b) => a < b).forEach(coin => {
      while((total + coin) <= amount) {       
        change.push(coin)
        total += coin
      }
    })

    return change
  }
}

const minCoinChange = new MinCoinChange([1, 3, 4])
console.log(minCoinChange.makeChange(6)) // [ 4, 1, 1 ]

const minCoinChange1 = new MinCoinChange([1, 5 , 10 , 25])
console.log(minCoinChange1.makeChange(36)) // [ 25, 10, 1 ]

// 比起动态规划算法而言，贪心算法更简单、更快。然而，如我们所见，它并不总是得到最优 答案。
// 但是综合来看，它相对执行时间来说，输出了一个可以接受的解