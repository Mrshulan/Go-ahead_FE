class Node {
  constructor(key) {
    this.key = null
    this.left = null
    this.right = null
  }
}

class AVLTree {
  costructor() {
    this.root = null
  }

  // 节点高度
  heightNode(node) {
    if(node === null) {
      return -1
    } else {
      return Math.max(heightNode(this.right), heightNode(this.left)) + 1
    }
  }

  // R -> 左旋 逆时针
  rotationRR (node) {
    let tmp = node.right
    node.right = tmp.left
    tmp.left = node

    return tmp
  }
  // L -> 右旋 顺时针
  rotationLL(node) {  
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node

    return tmp
  }

  // R L ->左双螺旋 先L 后R (右子)
  rotationRL(node) {
    node.right = rotationLL(node.right)

    return rotationRR(node)
  }
  // L R ->右双螺旋 先 R 后L (左子)
  rotationLR(node) {
    node.left = rotatitonRR(node.left)

    return rotationLL(node)
  }

  insertNode(node, element) {
    if(node === null) {
      node = new Node(element)
    } else if(element < node.key) {
      node.left = insertNode(node.left, element)

      if(node.left !== null) {
        // 左边 再左LL 再右LR
        if(heightNode(node.left) - heightNode(node.right) > 1) {
          if(element < node.left.key) {
            node = rotationLL(node)
          } else {
            node = rotationLR(node)
          }
        }
      }
    } else if(element > node.key) {
      node.right = insertNode(node.right, element)

      if(node.right !== null) {
        // 右边 再右RR 再左RL
        if(heightNode(node.right) - heightNode(left) > 1) {
          if(element > node.right.key) {
            node = rotationRR(node)
          } else {
            node = rotationRL(node)
          }
        }
      }
    }

    return node
  }
}