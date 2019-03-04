/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var rotate = function(nums, k) {
  let len = nums.length
  k = k % len

  _reverse(nums, 0, len - 1 - k)
  _reverse(nums, len - k, len -1)
  nums.reverse()

  return nums
  
  function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
  }
  function _reverse(nums, start, end) {
    while(start < end) {
      swap(nums, start, end)
      start++
      end--
    }
  }
}

console.log(rotate([1,2,3,4,5,6,7], 3))