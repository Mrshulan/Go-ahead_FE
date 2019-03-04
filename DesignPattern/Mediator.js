/* 
*  定义:
*  通过一个中介者对象，其他所有的相关对象都要通过该中介者对象通信
*  而不是相互引用，当一个对象发生改变的时候，只需要通知中介者对象，
*  通过中介者模式解除对象与对象之间的紧耦合关系
*  区别:
*  观察者模式通过维护一堆列表管理对象之间的多对多关系（解耦👇）  >发布订阅模式才是多对多吧<
*  (星状)中介者模式通过统一的接口来维护一对多关系，且通信者之间不需要知道彼此的关系，只需要约定API就行
*  场景:
*  购物车需求,存在商品选择表单,颜色选择表单，购物车数量表单等
*  都会触发change事件,那么可以通过中介者模式来转发处理这些事件,实现各个事件间解耦,
*  仅仅维护中介者对象即可
*/


/* let goods = {
  'red|32G': 3,
  'red|64G': 1,
  'blue|32G': 7,
  'blue|64G': 6
}

let Mediator = (function () {
  let colorSelect = document.getElementById("colorSelect")
  let memorySelect = document.getElementById('memorySelect')
  let numSelect = document.getElementById('numSelect')

  return {
    changed: function (obj) {
      switch(obj) {
        case colorSelect:
          // TODO
          break;
        case memorySelect:
          // TODO
          break;
        case numSelect:
          // TODO
          break;
      }
    },
  }
})();

colorSelect.onChange = function(){
  Mediator.changed(this)
}
memorySelect.onChange = function() {
  Mediator.changed(this)
}
numSelect.onChange = function() {
  Mediator.changed(this)
} */


class Bus {
  constructor() {
    this.passengers = {}
  }

  // 车内广播, 中介者约定API
  broadcast(passenger, message = passenger) {
    
    if(Object.keys(this.passengers).length){
      // 特殊情况给传入的passenger听
      if(passenger.id && passenger.listen) {
        if(this.passengers[passenger.id]) {
          this.passengers[passenger.id].listen(message)
        }
      // 否则就给所有的乘客听 message = passenger(也就是那个对象消息)
      } else {
        Object.keys(this.passengers).forEach(passenger => {
          if(this.passengers[passenger].listen) {
            this.passengers[passenger].listen(message)
          }
        })
      }
    }
  }

  // 上车的passenger 登记id
  board(passenger) {
    this.passengers[passenger.id] = passenger
  }

  off(passenger) {
    this.passengers[passenger.id] = null
    delete this.passengers[passenger.id]
    console.log(`乘客${passenger.id}下车`)
  }

  /* 发车和停车都是广播所有人 （二参没有传） 一参当然也没有passage.id*/
  // 发车
  start() {
    this.broadcast({type: 1, content: "开车,请系好安全带"})
  }
  // 停车
  end() {
    this.broadcast({type: 2, content: "停车,要下车的请注意~"})
  }
}

class Passenger {
  constructor(id) {
    this.id = id
  }

  listen(message) {
    console.log(`乘客${this.id}收到消息`, message)
    // 乘客发现停车了，于是自己下车
    if(Object.is(message.type, 2)) {
      this.off()
    }
  }

   // 下车
   off() {
    console.log(`我是乘客${this.id}，我现在要下车`,)
    bus.off(this);
  }
}


// new bus
const bus = new Bus()
// 新建三位位乘客id：1 id: 2 id: 3
const passenger1 = new Passenger(1)
const passenger2 = new Passenger(2)
const passenger3 = new Passenger(3)
// 两位乘客上车 登记 车里乘客添加
bus.board(passenger1)
bus.board(passenger2)
bus.board(passenger3)
// 2s后发车
setTimeout(bus.start.bind(bus), 2000)
// 3s时 广播2号乘客 2号乘客下车
setTimeout(() => {
  // 传入了具体的passenger2 所以是单独听
  bus.broadcast(passenger2, {type: 3, content: '同学你好,你没有买票'})
  // 手动让她下车
  bus.off(passenger2)
}, 3000)
// 4s到站 需要的乘客下车
setTimeout(bus.end.bind(bus), 4000)
// 6s重新发车
setTimeout(bus.start.bind(bus), 6000)