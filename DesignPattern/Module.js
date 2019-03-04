/* 
*  定义:
*  类提供私有和公有封装的方法 Revealing Module Pattern揭示模式 模块模式
*  目的是做到很好的代码隔离，只是将需要对外公开的变量和函数暴露出来
*  结构函数名与在页面上其他脚本定义的函数冲突的可能性降低
*/

// 模拟实现一个购物车功能
let basketModule = (function () {
  let basket = []

  function doSomethingPrivate() {
    //TODO
  }
  function doSomethingElsePrivate() {
    //TODO    
  }

  return {
    addItem: function(values) {
      basket.push(values)
    },
    getItemCount: function() {
      return basket.length
    },

    doSomething: doSomethingPrivate,

    getTotal: function() {
      let len = this.getItemCount()
      let sum = 0

      while(len--){
        sum += basket[len].price
      }

      return sum
    }
  }
})();

// 闭包返回了一个对象（名字空间）,我们就只能通过这个对象接口进行交互
basketModule.addItem({
  item: 'bread',
  price: 0.5
})
basketModule.addItem({
  item: "butter",
  price: 0.3
})

// console.log(basketModule.getItemCount())
// console.log(basketModule.getTotal())

// 你是看不到basket的
// console.log(basketModule.basket)
// console.log(basket) ->这就直接报错了 全局环境