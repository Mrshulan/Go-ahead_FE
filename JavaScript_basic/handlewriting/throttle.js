function throttle(func, wait, options) {
  var timeout, context, args
  var previous = 0
  if(!options) options = {}

  var later = function () {
    // 选择用时间戳(进入触发) 还是使用定时器（结束后会触发）
    previous = options.leading === false ? 0 : new Date().getTime()
    // 执行完就把定时器关了 然后再开一个emm 就像 时间戳方法一样 到了就更新 previous
    timeout = null
    func.apply(context, args)
    if(!timeout) context = args = null
  }

  var throttled = function () {
    var now = new Date().getTime()
    // 定时器方式 下边的remaining 直接会等于 wait时间 正好 兼容两种方法 !previous 也就是刚开始才会有
    if(!previous && options.leading === false) previous = now
    // 更新一下剩余时间
    // 啥也不传 options leading肯定是undefined 默认就是 时间戳 方式 leading true 第一次直接触发更新的时间
    var remaining = wait - (now - previous)

    context = this
    args = arguments
    
    // 因为上边的 previous=now 和  remaining 的更新 定时器方式就会跑到下边
    // 没有剩余时间了或者你改变了系统时间
    if(remaining <= 0 || remaining > wait) {
      // 时间戳方法的流入
      // 这个timeout清空是非常必要的 
      // remainging在中间中间值的时候 他会跑到下一个else 这里不断的清除这个定时器
      // 确保在可能只在结尾触发(开关控制) 是不是利用到debounce
      if(timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if(!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 触发时候定时器不存在 且 结束触发开关不是关了的 设定定时器
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return throttled
}