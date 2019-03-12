function shellSort(arr) {
  const len = arr.length
  let gap = Math.floor(len / 2)

  // while(gap < len / 3) {
  //   gap = gap * 3 + 1
  // }

  while (gap > 0) {
    for(let i = gap;i < len; i++) {
      const tmp = arr[i]
      let preIndex = i - gap

      while(arr[preIndex] > tmp) {
        arr[preIndex + gap] = arr[preIndex]
        preIndex -= gap
      }
      arr[preIndex + gap] = tmp
    }
    gap = Math.floor(gap / 2)
  }

  return arr
}

console.log(shellSort([2,3,5,1,4]))

// preIndex >= 0 不写这个等号是多么痛苦
// for (var preIndex = i - gap;preIndex >= 0; preIndex -= gap) {
//   if(arr[preIndex] > tmp) {
//     arr[preIndex + gap] = arr[preIndex]
//   } else {
//     break
//   }
// }