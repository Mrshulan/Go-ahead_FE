/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

 var levelOrder = function (root) {
   var ans = []
   helper(root, ans, 0) // 从第0层开始
   return ans
 }

  function helper(node, ans, i) {
    // 递归边界
    if(node === null) return
    
    // 每一层分配一个数组空间 (递归主体 调用干了什么)
    if(i === ans.length) ans.push([])
    ans[i].push(node.val)

    // 递归调用
    helper(node.left, ans, i + 1)
    helper(node.right, ans, i + 1)
  }