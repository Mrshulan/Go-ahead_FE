// in=place
function quickSort(arr) {
  let left = 0, right = arr.length - 1
  main(arr, left, right)


  function main(arr, left, right) {
    // 千言万语递归第一条
    if(arr.length === 1) return
    
    let index = partition(arr, left, right)
    // 返回的是基数的位置 所有index - 1 整理左边
    if(left < index - 1) {
      main(arr, left, index - 1)
    }
    // 右边要是有元素的话
    if(index < right) {
      main(arr, index, right)
    }

  }

  function partition(arr, left, right) {
    let pivot = arr[Math.floor((left + left) / 2)]

    // = 号 是必须的 因为 left还可能会移动 [2, 3, 5, 1, 4] 第一次到 1 的时候
    while(left <= right) {
      // left指到大于pivot
      while(arr[left] < pivot) {
        left++
      }
      while(arr[right] > pivot) {
        right--
      }

      if(left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
      }
    }

    return left
  }
}

function quickSort(arr) {
  // 千言万语递归第一条
  if(arr.length <= 1) return arr

  return [
    ...quickSort(arr.slice(1).filter(item => item < arr[0])),
    arr[0],
    ...quickSort(arr.slice(1).filter(item => item > arr[0]))
  ]
}


let arr = [2, 3, 5, 1, 4]
console.log(quickSort(arr))
console.log(arr)
