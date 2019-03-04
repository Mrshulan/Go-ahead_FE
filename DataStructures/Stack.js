class Stack {
  constructor() {
    this.items = []
  }

  push(element) {
    this.items.push(element)
  }

  pop() {
    return this.items.pop()
  }

  // 栈顶
  get peek() {
    return this.items[this.items.length - 1]
  }

  get isEmpty() {
    return !this.items.length
  }
  // 大小
  get size() {
    return this.items.length
  }

  clear() {
    this.items = []
  }
  print() {
    console.log(this.items.toString())
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)

// console.log(stack.peek)
// console.log(stack.size)
// console.log(stack.isEmpty)
// console.log(stack.pop())
// stack.print()
