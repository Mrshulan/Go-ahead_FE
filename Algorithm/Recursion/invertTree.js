/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 * this.val = val;
 * this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

// 递归用于求解问题规模不同的同类型问题。
// 这个题的最小问题规模是交换一个节点的左右子节点

var invertTree = function (root) {
  // 递归第一条
  if(!root) return root
  const left = root.left
  root.left = invertTree(root.right)
  root.right = invertTree(left)
  return root
}