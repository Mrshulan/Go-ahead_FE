function insertionSort(arr) {
  for(let i = 1,len = arr.length;i < len;i++) {
    let tmp = arr[i]
    let j = i - 1

    for(; j >= 0;j--) {
      if(arr[j] > tmp) {
        arr[j + 1] = arr[j]
      } else {
        // 如果不及时的break j的位置就保存的不准确
        break
      }
    }
    arr[j + 1] = tmp
  }

  // while(j >= 0 && arr[j] > tmp) {
  //   arr[j + 1] = a[j]
  //   j--
  // }
  
  return arr
}

let arr = [1, 3, 4, 5, 2]

console.log(insertionSort(arr))