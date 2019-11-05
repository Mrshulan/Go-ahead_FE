const Compiler = require('./Compiler')

class MyPlugin {
  constructor() {

  }

  apply(compiler) {
    compiler.hooks.brake.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'))
    compiler.hooks.accelerate.tap("LoggerPlugin", (newSpeed) => {`Accelerating to ${newSpeed}`})
    compiler.hooks.calculateRoutes.tapPromise("calculateRoutes tapAsync", (source, target, routesList) => {
      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(`tapPromise to ${source} ${target} ${routesList}`)
            resolve("tapPromise is excuted")
        },1000)
      }).then(result => {console.log(result); return "Unable to pass value ?"});
    })
  }
}


const myPlugin = new MyPlugin()

const options = {
  plugins: [myPlugin]
}

// 实例一个compiler对象(绑定在hooks对象的上的钩子new Hook 使用)
const compiler = new Compiler()

for(const plugin of options.plugins) {
  if(typeof plugin === "function") {
    plugin.call(compiler, compiler)
  } else {
    // 触发tap
    plugin.apply(compiler)
  }
}


// 主动run call
compiler.run()