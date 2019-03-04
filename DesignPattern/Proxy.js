/* 
*  定义：
*  为一个对象提供一个外壳(占用符)以便控制其他对象对他的访问 而defineProperty是相对于自己
*  代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。
*  场景：
*  常用的虚拟代理形式：某一个花销很大的操作，可以通过虚拟代理的方式延迟到这种需要它的时候才去创建
*  场景方法：
*  先通过一张loading图占位，然后通过异步的方式加载图片，等图片加载好了再把完成的图片加载到img标签里面
*/

// ES6中的Proxy对象
const target = {}
const handle = {
  set(target, property, value) {
    if(value !== undefined) {
      target[property] = value
    } else {
      throw new ReferenceError('undefined is not allowed')
    }
  },
  get(target, property) {
    if(property in target) {
      return target[property]
    } else {
      throw new ReferenceError(property + 'does not exist')
    }
  }
}

const proxyObj = new Proxy(target, handle)
// target.first = undefined; // 自己设置没有外壳的限制 这就得靠 defineProperty来拦截了
// console.log(proxyObj.first); 
// proxyObj.second = undefined; // 代理设置对象throw错误



// 可以与view区的lazyloading 相结合
let imgFunc = (function() {
  let imgNode = document.createElement('img')

  document.body.appendChild(imgNode)

  return {
    setSrc: function (src) {
      imgNode.src = src
    }
  }
})();

let ProxyImg = (function () {
  let img = new Image()

  img.onload = function() {
    imgFunc.setSrc(this.src)
  }

  return {
    setSrc: function (src) {
      imgFunc.setSrc('./loading.gif')
      // onload事件中的this指向
      img.src = src
    }
  }
})();

ProxyImage.setSrc('./pic.png')
