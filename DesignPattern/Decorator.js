/* 
*  定义：
*  在不改变对象自身的基础上，在程序运行期间给对象动态的添加职责(方法或属性)
*  与继承相比，装饰者是一种轻便灵活的做法。
*  简单说：可以动态给某个对象添加额外的职责，而不会影响从这个类中派生的其他对象
*  场景:
*  原有方法维持不变，在原有的方法上再挂载其他的方法来满足现有需要；
*  函数的解耦，将函数拆分成多个可复用的函数，再将拆分的函数挂载到，某个函数上，实现相同的结构但增强了复用性
*/

/* // ES7装饰器
function isAnimal(target) {
  target.isAnimal = true
  return target
};

@isAnimal()
class Cat {
  //
}

console.log(Cat)
console.log(Cat.isAnimal) */



Function.prototype.before = function(beforeFn) {
  let self = this

  // 返回包含新函数和原函数的“代理函数” -> 调整顺序
  return function () {
    // 修正this, 确保执行时候的context 
    beforeFn.apply(self, arguments)
    return self.apply(self, arguments)
  }
}

Function.prototype.after = function (afterFn) {
  let self = this

  return function () {
    let res = self.apply(self, arguments)
    afterFn.apply(self, arguments)
    return res
  }
}

let func1 = function() {
  console.log(this)
  console.log(1)
}

let func2 = function() {
  console.log(this)
  console.log(2)
}

let func3 = function() {
  // this是之前的before返回的匿名函数
  console.log(this)
  console.log(3)
}

// 将func1 func3挂载到func2左右两侧
func2 = func2.before(func1).after(func3)
func2()


/* // 新增指定类型的按钮新功能
let oBottom = document.getElememtById("bottom")
let decorator = function (id, fn) {
  let dom = document.getElementById(id)

  if(typeof dom.oncllick === 'function') {
    let oldClickFn = dom.onclick
    // 0级事件 覆盖
    dom.onclick = function () {
      oldClickFn()
      fn()
    } 
  } else {
    dom.onClick = fn
  }
}

oBottom.onclick = function () {
  alert(1)
  // todoSomethingelse
}

decorator("bottom", function () {
  setTimeout(function () {
    alert(2)
  }, 1000)
})

 */
