/* 
*  定义：
*  观察者模式指的是一个对象（Subject）维持一系列依赖于它的对象（Observer），当有关状态发生变更时 Subject 对象则通知一系列 Observer 对象进行更新。
*  在观察者模式中，Subject 对象拥有添加、删除和通知一系列 Observer 的方法等等，而 Observer 对象拥有更新方法等等 
*/

// -> 一维 subject有变化了 notify 都通知一下
function Subject() {
  this.observers = []
}

Subject.prototype = {
  constructor: Subject,

  add: function (observer) {
    this.observers.push(observer)
  },

  remove: function(observer) {
    let index = this.observers.findIndex(cb => Object.is(cb, observer))
    if(index > -1) {
      this.observers.splice(index, 1)
    }
  },

  notify: function() {
    this.observers.forEach(function (fn) {
      fn.update()
    })
  }
}

function Observer(name) {
  this.name = name
}

Observer.prototype = {
  constructor: Observer,
  update: function () {
    console.log(this.name + '收到更新')
  }
}

let sub = new Subject();

let obs1 = new Observer("shulan")
let obs2 = new Observer("Jimmie")


// sub.add(obs1)
// sub.add(obs2)

// sub.notify()

