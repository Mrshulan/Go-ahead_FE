function heapSort(arr) {

  buildHeap(arr)

  for(let i = arr.length - 1;i > 0;i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]]
    // i在自右向左 自底向上 正好把堆化最大的a[0](你看循环没有包括0)往后移动
    // 就是把最大的堆顶放到最后 其次 排除他自己i (heapify里边用的是 < heapSize)
    heapify(arr, i, 0)
  }

  // 构建初始堆 大跟堆
  function buildHeap(arr) {
    let mid = Math.floor(arr.length / 2)
    
    for(let i = mid;i >= 0;i--) {
      heapify(arr, arr.length, i)
    }
  }

  // 堆化节点
  function heapify(arr, heapSize, i) {
    let left = 2 * i + 1, right = 2 * i + 2
    let largest = i

    if(left < heapSize && arr[left] > arr[largest]) {
      largest = left
    }
    if(right < heapSize && arr[right] > arr[largest]) {
      largest = right
    }

    if(i !== largest) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]]
      arguments.callee(arr, heapSize, largest)
    }

    return arr
  }
}

let arr = [2, 5, 1, 3, 4]
heapSort(arr)
console.log(arr)