/**
 * @param {number[]} nums
 * @return {number}
 */

/* 一个整数序列，每一项可为负可为正。我们可以将当前序列和缓存。
如果当前的序列和小于 0，那么舍弃该序列，从当前项重新计算序列和；
如果大于 0，那么序列和加上当前项。 */
var maxSubArray = function (nums) {
  var sum = nums[0]
  var curSum = nums[0]

  for(var i = 1;i < nums.length;i++) {
    var cur = nums[i]

    if(curSum <= 0) {
      curSum = cur
    } else {
      curSum += cur
    }

    if(sum < curSum) {
      sum = curSum
    }
  }

  return sum
}