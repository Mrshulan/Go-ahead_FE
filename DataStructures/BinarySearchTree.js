// 节点类
class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(key) {
    const newNode = new Node(key)

    const insertNode = (node, newNode) => {
      if(newNode.key < node.key) {
        if(node.left === null) {
          node.left = newNode
        } else {
          insertNode(node.left, newNode)
        }
      } else {
        if(node.right === null) {
          node.right = newNode
        } else {
          insertNode(node.right, newNode)
        }
      }
    }

    if(!this.root) {
      this.root = newNode
    } else {
      insertNode(this.root, newNode)
    }
  }

  // 中序遍历
  inOrderTraverse(callback) {
    const inOrderTraverseNode = (node, callback) => {
      if(node !== null) {
        inOrderTraverseNode(node.left, callback)
        callback(node.key)
        inOrderTraverseNode(node.right, callback)
      }
    }

    inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverse2() {
    const inOrderTraverseNode = (node) => {
      const res = []
      const stack = []

      while(node || stack.length !== 0) {

        // 取尽 left
        while(node) {
          stack.push(node)
          node = node.left
        }

        if(stack.length) {
          let p = stack[stack.length - 1]
          res.push(p.key)
          stack.pop()
          // 之后开始移动 再取
          node = p.right
        }
      }

      return res
    }

    return inOrderTraverseNode(this.root)
  }

  // 先序遍历
  preOrderTraverse(callback) {
    const preOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        callback(node.key)
        preOrderTraverseNode(node.left, callback)
        preOrderTraverseNode(node.right, callback)
      }
    }

    preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverse2() {
    const preOrderTraverseNode = (node) => {
      const res = []
      const stack = []

      if(node != null) {
        stack.push(node)
      }

      while(node || stack.length !== 0) {
        var p = stack.pop()
        res.push(p.key)

        // 先放右边再放左边是因为取出来的顺序是相反的(栈)
        if(p.right != null) {
          stack.push(p.right)
        }
        if(p.left != null) {
          stack.push(p.left)
        }
      }

      return res
    }

    return preOrderTraverseNode(this.root)
  }

  // 后序遍历
  postOrderTraverse(callback) {
    const postOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        postOrderTraverseNode(node.left, callback)
        postOrderTraverseNode(node.right, callback)
        callback(node.key)
      }
    }

    postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverse2() {
    const postOrderTraverse2 = (node) => {
      const res = []
      const stack = []

      if(node != null) {
        stack.push(node)
      }

      while(node || stack.length !== 0) {
        var p = stack.pop()
        res.push(p.key)

        // 先左边后右边(栈)
        if(p.left != null) {
          stack.push(p.left)
        }
        if(p.right != null) {
          stack.push(p.right)
        }
      }

      return res.reverse()
    }

    return postOrderTraverse2(this.root)
  }

  min(node) {
    const minNode = node => {
      return node ? (node.left ? minNode(node.left) : node) : null
    }

    return minNode(node || this.root)
  }

  max(node) {
    const maxNode = node => {
      return node ? (node.right ? maxNode(node.right) : node) : null
    }

    return maxNode(node || this.root)
  }

  search(key) {
    const searchNode = (node, key) => {
      if(node === null) return false
      if(node.key === key) return node

      return searchNode((key < node.key) ?  node.left : node.right, key)
    }

    return searchNode(this.root, key)
  }

  remove(key) {
    const removeNode = (node, key) => {
      if(node === null) return false

      if(key < node.key) {
        node.left = removeNode(node.left, key)
        return node
      } else if(key > node.key) {
        node.right = removeNode(node.right, key)
        return node
      } else {
        // 叶子节点
        if(node.left === null && node.right === null) {
          node = null
          return node
        }

        // 只有一侧节点
        if(node.left === null){
          node = node.right
          return node
        } else if(node.right === null) {
          node = node.left
          return node
        }

        // 两侧都有节点
        // 从右侧找到最小节点 替换 保持结构 node.right
        let rMin = this.min(node.right)
        node.key = rMin.key
        node.right = removeNode(node.right, rMin.key)

        return node
      }
    }

    return removeNode(this.root, key)
  }
}
// BST存在一个问题：取决于你添加的节点数，树的一条边可能会非常深
// 也就是说，树的一 条分支会有很多层，而其他的分支却只有几层


const BST = new BinarySearchTree()
BST.insert(11)
BST.insert(7)
BST.insert(5)
BST.insert(3)
BST.insert(9)
BST.insert(8)
BST.insert(10)
BST.insert(13)
BST.insert(12)
BST.insert(14)
BST.insert(20)
BST.insert(18)
BST.insert(25)

// let str = '先序遍历 '
// let str1 = '中序遍历 '
// let str2 = '后续遍历 '
// BST.inOrderTraverse(value => {str1 += value + " "})
// BST.preOrderTraverse(value => {str += value + " "})
// BST.postOrderTraverse(value => {str2 += value + " "})
// console.log(str)
// console.log(str1)
// console.log(str2)
// console.log(BST.min(), BST.max())
// console.log(BST.search(9))
// BST.remove(3)
// console.log(BST.min())
