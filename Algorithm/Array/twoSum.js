/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var twoSum = function (nums, target) {
  var _map = new Map()
  var result = []

  for(var i = 0,iL = nums.length;i < iL;i++) {
    if(_map.has((nums[i]))) {
      result.push(_map.get(nums[i]))
      result.push(i)
    } else {
      _map.set(target - nums[i], i)
    }
  }  

  return result
}

console.log(twoSum([2, 7, 11, 15], 18))