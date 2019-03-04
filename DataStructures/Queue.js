class Queue{
  constructor(items) {
    this.items = items || []
  }

  enqueue(element) {
    this.items.push(element)
  }

  dequeue() {
    return this.items.shift()
  }

  // 队首
  get front() {
    return this.items[0]
  }

  get size() {
    return this.items.length
  }

  get isEmpty() {
    return !this.items.length
  }

  clear() {
    this.items = []
  }

  pring() {
    console.log(this.items.toString())
  }
}

// 优先队列
class PriorityQueue {
  constructor() {
    this.items = []
  }

  enqueue(element, priority) {
    const queueElement = {element, priority}

    if(this.isEmpty) {
      this.items.push(queueElement)
    } else {
      const preIndex = this.items.findIndex((item) => queueElement.priority < item.priority)

      if(preIndex > -1) {
        this.items.splice(preIndex, 0, queueElement)
      } else {
        this.items.push(queueElement)
      }
    }
  }

  dequeue() {
    return this.items.shift()
  }

  front() {
    this.items[0]
  }

  clear() {
    this.items = []
  }

  get size() {
    return this.items.length
  }

  get isEmpty() {
    return !this.items.length
  }

  print() {
    console.log(this.items)
  }
}

class LoopQueue extends Queue {
  constructor(items) {
    super(items)
  }

  getIndex(index) {
    const length = this.items.length

    return index > length ? this.items[(index % length)] : this.items[index]
  }

}

const priorityQueue = new PriorityQueue()
priorityQueue.enqueue("shualn", 2)
priorityQueue.enqueue("shuita", 1)
priorityQueue.enqueue("keji", 3)

priorityQueue.enqueue("jimmie", 1)
// priorityQueue.print()
// console.log(priorityQueue.isEmpty, priorityQueue.size)