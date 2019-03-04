/* 
*  定义：
*  定义一系列算法，把他们封装起来，并且使他们可以相互替换。
*  目的：
*  将算法的使用算法的实现的分离开来
*  方法:
*  第一个部分是一组策略类（可变），策略类封装了具体的算法，并负责具体的计算过程
*  第二个部分是环境类Context（不变），Context接受客户的请求，随后将请求委托给某一个策略类
*  要做到这一点，说明Context中要维持对某个策略对象的引用。
*/


// 策略类: 封装具体的算法
let levelStrategy = {
  "A": function (money) {
    return money * 4
  },
  "B": function (money) {
    return money * 3
  },
  "C": function (money) {
    return money * 2
  }
}


// 环境类 里边ctx不变 委托某一个策略类
// 通过level到levelStrategy里边找 然后传入money这个参数

let calculateReward = function(level, money) {
  return levelStrategy[level](money)
}

// console.log(calculateReward("A", 4000))
