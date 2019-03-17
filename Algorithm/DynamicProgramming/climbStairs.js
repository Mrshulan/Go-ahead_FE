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