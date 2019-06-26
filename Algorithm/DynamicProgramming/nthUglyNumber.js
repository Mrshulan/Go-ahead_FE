/**
   * 丑数求解过程：首先除2，直到不能整除为止，然后除5到不能整除为止，然后除3直到不能整除为止。
   * 最终判断剩余的数字是否为1，如果是1则为丑数，否则不是丑数
   * <p>
   * 解题思路：
   * 从1开始遍历，按丑数求解过程找出满足条件的第n个丑数（提交超时）
   * 思路优化（如何利用之前的计算）
   * 解题二：动态规划+三指针
   * dp保存按序排列的丑数，三指针分别是*2，*3，*5，找出下一个丑数
   *
   * @param n
   * @return
   */

/**
 * @param {number} n
 * @return {number}
 */

var nthUglyNumber = function (index) {
  if(index === 0) return 0
  var uglyNum = [1]
  var factor2 = 0
  var factor3 = 0
  var factor5 = 0

  // 三指针动态规划  2 3 5 因子组合排列
  for(var i = 1; i < index;i++) {
    // dp上一个 有 该项 因子的 对比
    uglyNum[i] = Math.min(uglyNum[factor2] * 2, uglyNum[factor3] * 3, uglyNum[factor5] * 5)
    if(uglyNum[i] === uglyNum[factor2] * 2) factor2++
    if(uglyNum[i] === uglyNum[factor3] * 3) factor3++
    if(uglyNum[i] === uglyNum[factor5] * 5) factor5++
  }

  return uglyNum[index - 1]
}

console.log(nthUglyNumber(10))
// 输出: 12
// 解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。