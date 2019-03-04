class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  // 添加节点
  append(element) {
    const node = new Node(element)
    let current = null

    if(this.head === null) {
      this.head = node
    } else {
      current = this.head

      while(current.next) {
        current = current.next
      }
      current.next = node
    }
    this.length++
  }
  // 插入节点
  insert(position, element) {
    if(position >= 0 && position <= this.length) {
      const node = new Node(element)
      let current = this.head
      let previous = null
      let index = 0

      if(position === 0) {
        node.next = current
        this.head = node   
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }

        node.next = current
        previous.next = node
      }
      this.length++

      return true
    }

    return false
  }

  // 删除节点
  removeAt(position) {
    if(position > -1 && position < this.length) {
      let current = this.head
      let previous = null
      let index = 0

      if(position === 0) {
        this.head = current.next
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }

        previous.next = current.next
      }
      this.length--


      return current.element
    }

    return null
  }

  // 查找元素
  indexOf(element) {
    let current = this.head
    let index = 0

    while(current) {
      if(element === current.element) {
        return index
      }
      index++
      current = current.next
    }

    return -1
  }

  // 删除元素
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  isEmpty() {
    return !this.length
  }
  size() {
    return this.length
  }
  toString() {
    let current = this.head
    let str = ''

    while(current) {
      str += " " + current.element
      current = current.next
    }

    return str
  }
}

const linkedList = new LinkedList()
console.log(linkedList)

linkedList.append(2)
linkedList.append(3)
linkedList.append(5)
linkedList.append(10)

linkedList.insert(3, 100)
console.log(linkedList.toString())
console.log(linkedList.indexOf(10))
linkedList.remove(2)
console.log(linkedList.toString())
console.log(linkedList)