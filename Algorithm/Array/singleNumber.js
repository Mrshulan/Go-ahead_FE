/**
 * @param {number[]} nums
 * @return {number}
 */

var singleNumber = function(nums) {

  // 异或 相同为零 不同为1， 与自己异或为0 为0异或为自己 支持交换率
  for(var i = 1,iL = nums.length; i < iL; i++) {
    nums[0] ^= nums[i]
  }

  return nums[0]
}

console.log(singleNumber([4,1,2,1,2]))