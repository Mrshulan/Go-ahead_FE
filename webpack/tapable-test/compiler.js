const {
  SyncHook,
  AsyncSeriesHook
} = require('tapable')

module.exports = class Compiler {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newspeed']),
      brake: new SyncHook(),
      calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList'])
    }
  }

  run() {
    this.accelerate(10)
    this.break()
    this.calculateRoutes('Async', 'hook', 'demo')
  }

  accelerate(speed) {
    this.hooks.accelerate.call(speed)
  }

  break() {
    this.hooks.brake.call()
  }

  calculateRoutes() {
    // .callAsync = .promise 执行tapPromise的第二个参数
    // 在这里的then 参数带不过来？
    this.hooks.calculateRoutes.promise(...arguments).then(function (result) {
      console.log(result)
    }, (err) => {
      console.error(err)
    })
  }
}