/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  if(nums.length == 0) return null
  return helper(nums, 0, nums.length - 1)
};

function hepler(nums, lo, hi) {
  // 递归边界
  if(lo > hi) return null

  // 递归函数主体
  let mid = parseInt((lo + hi + 1) / 2)
  let node = new TreeNode(nums[mid])

  node.left = helper(nums, lo, mid - 1)
  node.right = helper(nums, mid + 1, hi)

  // 递归调用返回值
  return node
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

console.log(sortedArrayToBST([-10,-3,0,5,9]))