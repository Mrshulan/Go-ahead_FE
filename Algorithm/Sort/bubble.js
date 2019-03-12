function swap(arr, idx1, idx2) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

function bubbleSort(arr) {
  let len = arr.length

  // 第一个-1是 趟数可以减一 因为 最后一次浪费 第二个比较次数 因为是间隔
  // for(var i = 0;i < len - 1;i++) {
  //   for(var j = 0; j < len - i - 1;j++) {  // 找最大
  //     if(arr[j] > arr[j + 1]) {
  //       swap(arr, j, j + 1)
  //     }
  //   }

  //   // for(var j = len - 1;j > i;j--) { // 找最小
  //   //   if(arr[j] < arr[j - 1]) {
  //   //     swap(arr, j, j - 1)
  //   //   }
  //   // }
  // }

  /* 
    趟数0  比较次数4  趟数倒过来4
    1 3 3
    2 2 2
    3 1 1
  */
  for(var i = len - 1;i > 0;i --) {
    for(var j = 0;j < i;j++) {
      if(arr[j] > arr[j + 1]) {
        swap(arr, j,j + 1)
      }
    }
  }

  return arr
}

// pos
function bubbleSort(arr) {
  let i = arr.length - 1

  // 排序的最后比较位置登记  也就是尽量要内层循环比较次数少一点
  while(i > 0) {
    let pos = 0
    for(let j = 0;j < i;j++) {
      if(arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        pos = j
      }
    }
    i = pos
  }

  return arr
}

// 同时最大值 最小值
function bubbleSort(arr) {
  let start = 0
  let end = arr.length - 1

  while(start < end) {
    for(let i = start;i < end;i++) {
      if(arr[i] > arr[j + 1]) {
        swap(arr, i,i + 1)
      }
    }
    end--

    for(var i = end;i > start;i--) {
      if(arr[i] < arr[i - 1]) {
        swap(arr,i,i - 1)
      }
    }
    start++
  }

  return arr
}


// pos + 双向遍历 (减少趟数 比较次数)
function bubbleSort(arr) {
  let start = 0
  let end = arr.length - 1

  while(start < end) {
    let startPos = 0
    let endPos = 0

    for(let i = start;i < end;i++) {
      if(arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
        endPos = i
      }
    }
    end = endPos

    for(let i = end;i > start;i--) {
      if(arr[i] < arr[i - 1]) {
        swap(arr, i, i - 1)
        startPos = i
      }
    }
    start = startPos
  }

  return arr
}
console.log(bubbleSort([2, 5, 1, 3, 4]))
