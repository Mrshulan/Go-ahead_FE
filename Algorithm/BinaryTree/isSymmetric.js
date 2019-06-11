    
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
// 递归方法
var isSymmetric = function (root) {
  return helper(root, root)
}

function helper(l, r) {
  // 递归结束条件
  // 叶子节点
  if(l == null && r == null) return true
  if(l == null || r == null) return false

  // 至于为什么要left right 交换 && 可以试着用[2, 3, 3, 4, 5, null, 4] => 其实就是镜像的关系
  return (l.val === r.val) && helper(l.left, r.right) && helper(l.right, r.left)
}

// 迭代手法
var isSymmetric = function (root) {
  if(!root) return true

  let queue = [root.left, root.right] // 下一层需要遍历的节点

  while(queue.length) {
    let len = queue.length // 遍历到的这一层的节点数
    let level = []
    // 这里这一层的节点数
    while(len) {
      let pop = queue.shift() // 挨个出队列
      level.push(pop) // 将每一层的的节点都加入level 方便下边的 =>  将题目转换成数组对称问题
      if(pop) {
        queue.push(pop.left)
        queue.push(pop.right)
      }
      len--
    }
    // 判断当前层次生成的数组是否对称
    for(let i = 0,l = level.length;i < parseInt(l/2); i++) {
       // 一个为null，一个不为null的情况
      if(level[i] == null && level[l-1-i] !== null) return false
      if(level[i] !== null && level[l-1-i] === null) return false
      // 两个都不是null的情况
      if(level[i] !== null && level[l-1-i] !== null) {
        if (level[i].val !== level[l-1-i].val) return false
      }
    }
  }

  return true
}