/*
*  观察者模式中依赖于 Subject 对象的一系列 Observer 对象在被通知（notify）之后只能执行同一个特定的更新方法。
*  发布订阅模式比观察者模式要更加灵活多变，在发布订阅模式中则可以基于不同的主题(键值)去执行不同的自定义事件
*  发布订阅模式属于广义上的观察者模式
*  一个是紧密耦合，一个是松散耦合。
*  紧密耦合的方式简单直接，扩展性差，而且要求两端同时存在。
*  松散耦合不直接产生依赖，更容易扩展，懒加载的时候会有优势，但稍显复杂。
*/


// 观察者模式通过维护一堆列表来管理对象间的多对多关系[]一维  notify一起通知

class Player {
  constructor() {
    this.watchers = {}
    
    // 自身模拟事件发布
    setTimeout(() => {
      this._publish('play', true)
    }, 2000)

    setTimeout(() => {
      this._publish('pause', true)
    }, 4000)

  }

  // 发布事件函数
  _publish(event, data) {
    if(this.watchers[event] && this.watchers[event].length){
      this.watchers[event].forEach(cb => cb.call(this, data))
    }
  }

  // 订阅事件
  subscribe(event, callback) {
    this.watchers[event] = this.watchers[event] || []
    this.watchers[event].push(callback)
  }

  // 取消订阅事件
  unsubscribe(event = null, callback = null) {
    // 指定事件 + 回调函数 就删除该指定事件
    if(callback && event) {
      if(this.watcher[event] && this.watchers[event].length) {
        try {
          this.watchers[event].splice(this.watchers[event].findIndex(cb => Object.is(cb, callback)), 1)
        } catch (error) {
          throw new ReferenceError("Callback is not found")
        }
      }

    // 只传入事件, 就将该回调数组事件队列置空
    } else if (event) {
      this.watchers[event] = []
    // 没有传入 就置空观察者队列 领盒饭
    } else {
      this.watchers = {}
    }
  }
}


const player = new Player()

// 设置不同的订阅类型回调函数
const onPlayerPlay1 = function (data) {
  console.log('1: Player is play,current player', this, data)
}

const onPlayerPlay2 = data => {
  console.log('2: Player is play', data)
}

const onPlayerPause = data => {
  console.log('Player is pause', data)
}

const onPlayerLoaded = data => {
  console.log('Player is loaded', data)
}


// 订阅不同的事件 回调函数都push到 watchers观察者相应队列里边
// 一但发布就执行 订阅回调函数 订阅->发布 (因为发布就是执行)
// macroTask ->2s
player.subscribe('play', onPlayerPlay1)
player.subscribe('play', onPlayerPlay2)
// 4s
player.subscribe('pause', onPlayerPause)

// // 退订指定play中 onPlayPlay2
// player.unsubscribe('play', onPlayerPlay2)

// // 退订所有的pause
// player.unsubscribe('pause')

// // 退订所有事件
// player.unsubscribe()

// 可以在外部手动发出事件（但在真实生产场景中，发布特性一般为类内部私有方法）
player.subscribe('loaded', onPlayerLoaded)
player._publish('loaded', true)