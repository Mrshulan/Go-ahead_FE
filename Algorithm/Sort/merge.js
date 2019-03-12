function mergeSort(arr) {
  return main(arr)

  // 归一
  function main(arr) {
    // 千言万语递归第一条
    if(arr.length === 1) return arr

    let mid = Math.floor(arr.length / 2)
    let left = arr.slice(0, mid)
    let right = arr.slice(mid)

    return merge(arguments.callee(left), arguments.callee(right))
  }
  // 合并
  function merge(left, right) {
    let il = 0,rl = 0
    let result = []

    while(il < left.length && rl < right.length) {
      if(left[il] < right[rl]) {
        result.push(left[il++])
      } else {
        result.push(right[rl++])
      }
    }

    return result.concat(left.slice(il)).concat(right.slice(rl))
  }
}

var arr = [8, 7, 6, 5]
console.log(mergeSort(arr))