/* 
*  需求分析: 
*  拿到需要啊lazyloading的img dom
*  遍历判断每一个是否经过或者遇到视口可视范围内
*  从data- 取出并设置src
*  scroll事件监听
*/

// 尾递归的方法，提高性能
function getTop(el, initial) {
  let top = el.offsetTop + initial

  if(el.offsetParent !== null) {
    top += el.offsetParent.clientTop
    return getTop(el.offsetParent, top)
  } else {
    return top
  }
}

// 循环的方法
// function getTop(el) {
//   let top = el.offsetTop
//   let parent = el.offsetParent

//   while(parent !== null) {
//     top += parent.clientTop + parent.offsetTop
//     parent = parent.offsetParent
//   }

//   return top
// }


function isView(el) {
  // clientHeight（会算上滚动条）
  const clientHeight = document.documentElement.clientHeight
  // scrollTop滚动的变化 加上 clientHeight 
  const scrollHeight = document.documentElement.scrollTop + clientHeight
  console.log(clientHeight, scrollHeight, el.getBoundingClientRect().top, getTop(el, 0) )
  // 判断元素距离顶部 是否小于 scrollHeight整个值(视口加变化)
  // return getTop(el,0) < scrollHeight;

  // 直接判断元素是否在视口里边
  return el.getBoundingClientRect().top < clientHeight
}

function loadimg(el) {
  if(!el.src) {
    if(el.dataset) {
      el.src = el.dataset.src
    } else {
      el.src = el.getAttribute("data-src");
    }
  }
}

function checkImgs() {
  let imgs = document.getElementsByClassName('lazy-area')[0].getElementsByTagName('img');

  Array.from(imgs).forEach(el => {
    if(isView(el)) {
      loadimg(el)
    }
  })
}

function trottle(fn, time) {
  let startTime = +new Date()

  return function() {
    let nowTime = +new Date()
    let context = this
    let args = arguments

    if(nowTime - startTime > time) {
      startTime = nowTime
      fn.apply(context, args)
    }
  }
}

window.onscroll = trottle(checkImgs, 100);
window.onload = checkImgs;



