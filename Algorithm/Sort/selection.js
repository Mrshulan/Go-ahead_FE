function swap(arr, idx1, idx2) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

function selection(arr) {
  let len = arr.length

  for(let i = 0;i < len - 1;i++) {
    let minIdx = i

    for(let j = i + 1; j < len;j++) {
      if(arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    if(i !== minIdx) {
      swap(arr, i, minIdx)
    }
  }

  return arr
}

console.log(selection([2, 5, 1, 3, 4]))
