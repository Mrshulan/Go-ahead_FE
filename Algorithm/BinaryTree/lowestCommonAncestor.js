/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// var lowestCommonAncestor = function (root, p, q) {
//   if (root == null || root == p || root == q) return root
//   let left = lowestCommonAncestor(root.left, p, q)
//   let right = lowestCommonAncestor(root.right, p, q)
//   return left == null ? right : right == null ? left : root
// };

/* 
首先确保p的值小于q，若不是，则互换。这样有助于判断root、p、q三者的位置。

三种情况
root在中间，说明最近公共祖先只能是root，返回root
root最小，说明p和q的最近公共祖先一个在root的右边，使用root.right递归调用
root最大，说明p和q的最近公共祖先一个在root的左边，使用root.left递归调用 
*/

var lowestCommonAncestor = function(root, p, q) {
  if (p.val > q.val) [p, q] = [q, p];                           // 让p小于q,方便判断
  if (root.val >= p.val && root.val <= q.val) {
    return root;
  } else if (root.val <= p.val && root.val <= q.val) {
    return lowestCommonAncestor(root.right, p, q);
  } else if (root.val >= p.val && root.val >= q.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
}

// [3,5,1,6,2,0,8,null,null,7,4]
// 5
// 1

// 3