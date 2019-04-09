/* var events=require('events')
var eventEmitter=new events.EventEmitter()
eventEmitter.on('say',function(name){
    console.log('Hello',name)
})
eventEmitter.emit('say','shulan') */

function Events () {
  this.on = function (eventName, callback) {
    if(!this.handles) {
      this.handles = {}
    }
    if(!this.handles[eventName]) {
      this.handles[eventName] = []
    }
    this.handles[eventName].push(callback)
  }

  this.emit = function (eventName, obj) {
    if(this.handles[eventName]) {
      for(var i = 0,iL = this.handles[eventName].length;i < iL;i++) {
        this.handles[eventName][i](obj)
      }
    }
  }

  this.off = function (eventName, callback) {
    if(this.handles[eventName]) {
      var index = this.handles[eventName].findIndex(fn => Object.is(fn, callback))
      if(index > -1) {
        this.handles[eventName].splice(index, 1)
      }
    }
  }

  this.once = function (eventName, callback) {
    var self = this

    if(!this.handles) {
      this.handles = {}
    }
    if(!this.handles[eventName]) {
      this.handles[eventName] = []
    }

    function _f(obj) {
      self.off(eventName, _f)
      return callback.call(this, obj)
    }

    this.handles[eventName].push(_f)
  }

  
  return this
}