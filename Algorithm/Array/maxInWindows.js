// 滑动窗口中的最大值 o(n)
// 滑动窗口就是一个队列，数组中的一个一个的数先进去，先出来, 记录最大值位置进行更换。
function maxInWindows(arr, size) {
  if(size > arr.length || size === 0) {
    return []
  }

  var res = []
  var maxIndex = -1

  // 窗口滑动
  for(var l = 0, r = size - 1; r < arr.length;l++, r++) {
    // 每次挪动一个位置, 如果记录位置处于(刚好移除出去的位置 需要更新位置)
    if(maxIndex < l) {
      maxIndex = getMaxIndex(arr, l, r)
    }
    // 如果还在窗口里边 就需要和新进来的 r边 比较
    if(arr[r] > arr[maxIndex]) {
      maxIndex = r 
    }
    res.push(arr[maxIndex])
  }

  return res
}

// 获取区间内最大值
function getMaxIndex(arr, l, r) {
  var index = l

  for(var i = l;i <= r;i++) {
    if(arr[i] > arr[index]) index = i
  }

  return index
}


console.log(maxInWindows([2,3,4,2,6,2,5,1], 3))