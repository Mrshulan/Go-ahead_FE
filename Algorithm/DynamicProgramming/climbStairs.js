/**
* @param {number} n
* @return {number}
*/

// 最优的解法：这是一个典型的斐波那契数列。
var climbStairs = function (n) {
  let n1 = 1
  let n2 = 1
  for(let i = 2;i <= n;i++) {
    let ways = n1 + n2
    n1 = n2
    n2 = ways
  }

  return n2
}

var climbStairs = function (n) {
  let dp = []

  if(n == 0) {
      return 0
  }
  for(let i = 0;i <= n;i++){
      if(i < 3){
          dp.push(i)
      } else {
          dp.push(dp[dp.length-1]+dp[dp.length-2])
      }
  }

  return dp[dp.length-1]
}

console.log(climbStairs(3))