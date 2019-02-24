/**
 * @param {number[]} nums
 * @return {boolean}
 */

var containsDuplicate = function(nums) {
  for(var i = 0,iL = nums.length; i < iL;i++) {
    if(nums.indexOf(nums[i] !== i)) return true
  }

  return false
}

console.log(containsDuplicate([1, 1, 2]))