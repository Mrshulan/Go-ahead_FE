/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  for(var i = nums.length - 1;i >= 0;i--) {
    for(var j = i - 1;j >= 0;j--) {
      if(nums[j] === nums[i]) {
        nums.splice(j, 1)
      }
    }
  }

  return nums.length
}

console.log(removeDuplicates([1, 1, 2]))