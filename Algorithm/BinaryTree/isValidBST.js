/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
/* node.left.val <= node.val <= node.right.val */
// 第一种递归
var isVaildBST = function (root) {
  return validate(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
}
const validate = (node, min, max) => {
  if(!node) return true
  if(node.val < min || node.val > max) return false

  return validate(node.left, min, node.val - 1) && validate(node.left, node.val + 1,  max)
}
// 第二种递归 (如果递归没有返回值 那么肯定就是 向上搜索变量去了)
let isValid = true
var isVaildBST =  function(root) {
  if(root == null) return true
  helper(root)
  return isValid
}

function helper(node) {
  if(node == null) return
  if(node.left != null) {
    if(node.left.val > node.val) {
      isVaild = false
      return
    }
    // 继续看左边
    helper(node.left)
  }

  if(node.right != null) {
    if(node.right.val < node.val) {
      isValid = false
      return
    }
    // 继续看右边
    helper(node.right)
  }
}