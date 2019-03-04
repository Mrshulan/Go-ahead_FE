/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

var intersect = function(nums1, nums2) {
  var result = []

  for(var i = 0,iL = nums1.length;i < iL;i++) {
    if(nums2.indexOf(nums1[i]) !== -1) {
      result.push(nums1[i])
      nums1.splice(nums2.indexOf(nums1[i]), 1)
    }
  }

  return result
}

console.log(intersect([1, 1, 2], [2, 3]))

// 如果给定的数组已经排好序呢？你将如何优化你的算法？
// 如果 nums1 的大小比 nums2 大很多，哪种方法更优？
// 如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？