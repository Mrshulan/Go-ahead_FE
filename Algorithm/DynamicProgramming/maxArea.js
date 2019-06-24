/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let maxArea = 0
  let left = 0,right = height.length - 1
  // 一维DP
  while(left < right) {
    // 木桶理论
    maxArea = Math.max(maxArea, (Math.min(height[left], height[right]) * ( right - left)))
    // 如果以左边短侧为主 left++ 继续dp对比
    if(height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }

  return maxArea
};


console.log(maxArea([3, 4, 6, 2, 8, 4, 3, 1, 3, 4, 4]))
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
// 36
// 49