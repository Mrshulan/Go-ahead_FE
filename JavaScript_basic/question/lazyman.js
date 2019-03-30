/* 
实现一个LazyMan，可以按照以下方式调用:
LazyMan('Hank')输出:
Hi! This is Hank!

LazyMan('Hank').sleep(10).eat('dinner')输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper')输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper')输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
*/

class _Lazyman {
  constructor (name) {
    this.tasks = []

    const task = () => {
      console.log(`Hi this is ${name}`)
      this.next()
    }

    this.tasks.push(task)

    // 在下一个事件循环启动任务队列[]
    setTimeout(() => {
      this.next()
    })
  }

  /* 事件调度函数 koa中间件机制 next连锁反应 */
  next() {
    const task = this.tasks.shift()
    task && task()
  }

  sleep(time) {
    this._sleepWrapper(time, false)
    return this
  }

  sleepFirst(time) {
    this._sleepWrapper(time, true)
    return this
  }

  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }

    if(first) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }

  eat(name) {
    const task = () => {
      // eat可以没必要setTimeout
      setTimeout(() => {
        console.log(`Eat ${name}`)
        this.next()
      })
    }

    this.tasks.push(task)
    return this
  }

}

/* 封装 */
function LazyMan(name) {
  return new _Lazyman(name)
}

LazyMan('Hank').eat('dinner').eat('supper')
// LazyMan('Hank').sleep(10).eat('dinner')
// LazyMan('Hank').sleepFirst(5).eat('supper')


