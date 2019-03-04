class Node {
  constructor(element) {
    this.element = element
    this.prev = null
    this.next = null
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(element) {
    const node = new Node(element)
    let current = null

    if(this.head === null) {
      this.head = node
      this.tail = node
    } else {
      current = this.head
      while(current.next) {
        current = current.next
      }
      current.next = node
      node.prev = current

      this.tail = node
    }
    this.length++
  }

  insert(position, element) {
    if(position >= 0 && position <= this.length) {
      const node = new Node(element)
      let current = this.head
      let previous = null
      let index = 0

      // 首位
      if(position === 0) {
        if(!this.head) {
          this.head = node
          this.tail = node
        } else {
          node.next = current
          current.prev = node
          this.head = node
        }
        // 末位
      } else if (position === this.length) {
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }

        node.next = current
        previous.next = node
        current.prev = node
        node.prev = previous
      }
      this.length++

      return true
    }

    return false
  }

  removeAt(position) {
    if(position >= 0 && position < this.length) {
      let current = this.head
      let previous = null
      let index = 0

      if(position === 0) {
        this.head = this.head.next
        this.head.prev = null

        if(this.length === 1) {
          this.tail = null
        }
      } else if (position === this.length - 1) {
        current = this.tail
        this.tail = this.tail.prev
        this.tail.next = null
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }

        previous.next = current.next
        current.next.prev = previous
      }
      this.length--

      return current.element
    }

    return null
  }

  // TODO
}

const doublyLinkedList = new DoublyLinkedList()
console.log(doublyLinkedList)

doublyLinkedList.append(2)
doublyLinkedList.append(3)
doublyLinkedList.append(5)
doublyLinkedList.append(10)
console.log(doublyLinkedList)
doublyLinkedList.insert(3, 100)
console.log(doublyLinkedList)
doublyLinkedList.removeAt(4)
console.log(doublyLinkedList)

