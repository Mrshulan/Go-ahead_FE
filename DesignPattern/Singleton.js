/* 定义:
*  保证一个类只有一个实例，并提供一个访问它的全局访问点（调用一个类，任何时候返回的都是同一个实例）
*  实现方法:
*  使用一个变量来标志当前是否已经为某个类创建过对象
*  如果创建了，则在下一次获取该类的实例时，直接返回之前创建的对象，否则就创建一个对象。
*  使用场景:
*  适用场景：一个单一对象。比如：弹窗，无论点击多少次，弹窗只应该被创建一次
*/

// 静态方法判断 内部实现
class Singleton {
  constructor(name) {
    this.name = name
  }

  getName() {
    console.log(this.name)
  }

  static getInstance(name) {
    if(!this.instance) {
      this.instance = new Singleton(name)
    }

    return this.instance
  }
}
const instanceA = Singleton.getInstance("Jimmie")
const instanceB = Singleton.getInstance("shulan")
console.log(instanceA === instanceB)
console.log(instanceA)


/* // 代理实现 Singleton
class Singleton {
  constructor(name) {
    this.name = name
  }

  getName() {
    console.log(this.name)
  }
}

let ProxyMode = (function () {
  let instance = null
  return function (name) {
    if(!instance) {
      instance = new Singleton(name)
    }

    return instance
  }
})();

const instanceA = new ProxyMode("Jimmie")
const instanceB = new ProxyMode("shulan")
console.log(instanceA === instanceB)
console.log(instanceB)
 */