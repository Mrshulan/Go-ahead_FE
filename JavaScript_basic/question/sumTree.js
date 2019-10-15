// 二叉树所有根节点到叶子节点的路径所组成数字的和

function sumTree(root, sum = 0) {
  if(!root) {
    return 0
  }

  sum = sum * 10 + root.val

  if(!root.left && !root.right) {
    return sum
  }

  return sumTree(root.left, sum) + sumTree(root.right, sum)
}
