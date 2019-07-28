//JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
class Scheduler {
  // TODO
  constructor() {
    this.size = 2;
    this.queue = [];
  }
  add(promiseCreator) {
    // 当前可容下的尺寸 就then执行这个
    if(this.size > 0) {
      this.size--;

      return promiseCreator().then((value) => {
        this.size++;

        // 队列不为空 取出头部执行异步操作(也就是之前来排队了的 比方说3的执行) 也开始异步执行
        if(this.queue.length !== 0) {
          const deferP = this.queue.shift();
          // 调整一下this
          this.add.apply(this, () => 
            deferP.taskGen().then((value) => deferP.resolve(value))
          );
        }

        return value;
      })
      // 没有size的时候 装入队列defer调度
    } else {
      return new Promise((resolve, reject) => {
        this.queue.push({ taskGen: promiseCreator, resolve, reject })
      })
    }
  }

  // ...
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

// 一次性安排好
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4