/* 
*  适配器的方法是对原有对象进行适配，
*  添加的方法与原有方法功能大致相似，只是换了一种更加便利与我们开发的形式
*  
*  装饰者模式中可以不了解原有功能，
*  并且原有的方法照样可以原封不动的使用，如果原有的方法不能用了，说明你的模式有问题，是不可取的
*/


// 参数适配器
function doSomething(obj) {
   // 固定了参数位置 而传入的obj又不知道
   var adapter = {
    name: "shulan",
    age: "20",
    height: "172"
  }

  for(var i in adapter) {
    // 按照传入的来
    adapter[i] = obj[i] || adapter[i]
  }

  console.log(adapter)
}

doSomething({
  height: "175"
})

// 后端返回Object 前端需要的是Array
function objToArray (obj) {
  var arr = []
  
  for(var i in obj) {
    if(obj.hasOwnProperty(i)) {
      arr.push(obj[i])
    }
  }

  return arr
}

console.log(objToArray({
  name: "shulan",
  age: "20",
  height: "175"
}))
