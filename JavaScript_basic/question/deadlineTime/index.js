// 当前服务器时间 = 服务器系统返回时间 + 网络传输时间 + 前端渲染时间 + 常量（可选）


// 持续占用线程
setInterval(function () {
  var j = 0
  while(j++ < 10000000) {}
}, 0)

// 倒计时
var interval = 1000
var ms = 50000 // 从服务器和活动开始时间计算出时间差 (测试)
var count = 0
var startTime = new Date().getTime()

if(ms >= 0) {
  var timeCounter = setTimeout(countDownStart, interval)
}

// 由于线程阻塞延迟问题，做了 setTimeout 执行时间的误差修正，保证 setTimeout 执行时间一致。若冻结时间特别长的，还要做特殊处理。
function countDownStart() {
  count++
  var offset = new Date().getTime()  - (startTime + count*interval)
  var nextTime = interval - offset

  if(nextTime < 0) {
    nextTime = 0
  }

  ms -=interval

  console.log("误差: " + offset + "ms, 下一次执行: " + nextTime + "ms后，离活动开始还有：" + ms + "ms")

  if(ms < 0) {
    clearTimeout(timeCounter)
  } else {
    timeCounter = setTimeout(countDownStart, nextTime)
  }
}

