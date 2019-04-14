// 基于快排思想中的partition函数
function moreThanHalfNumSolution(numbers) {
  let left = 0
  let right = numbers.length - 1
  let key = partition(numbers, left, right)

  // 以mid作为始终的中间参考 
  const mid = numbers.length >> 1

  // key若是大 则值在左侧 若是小 则值在右侧
  while(key !== mid) {
    if(key > mid) {
      key = partition(numbers, left, key - 1)
    } else {
      key = partition(numbers, key + 1, right)
    }
  }

  let res = numbers[mid]
  // 验证一下是否是数组中出现次数超过一半的数
  if(!checkMoreThanHalf(numbers, res)) {
    res = 0
  }
  return res


  function partition(arr, left, right) {
    let pivot = arr[Math.floor((left + right) / 2)]

    while(left <= right) {
      while(arr[left] < pivot) {
        left++
      }
      while(arr[right] > pivot) {
        right--
      }

      if(left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
      }
    }

    return left
  }

  function checkMoreThanHalf(numbers, num) {
    let times = 0

    for(let i = 0; i < numbers.length;i++) {
      if(num === numbers[i]) {
        times++
      }
    }

    if(times * 2 <= numbers.length) {
      return false
    }

    return true
  }
}


// 根据数组特点来做，数组中有一个数字出现的次数超过数组长度的一半，也就是说它出现的次数比其他所有数字出现的次数的和还要多
function moreThanHalfNumSolution(numbers) {
  let res = numbers[0]
  let times = 1

  // 似乎像极了maxSubArray问题 一个标志项
  for(let i = 0;i < numbers.length;i++) {
    if(times === 0) {
      res = numbers[i]
      times = 1
    } else if(numbers[i] === res) {
      times++
    } else {
      times--
    }
  }

  if (!checkMoreThanHalf(numbers, res)) {
    res = 0;
  }

  return res

  function checkMoreThanHalf(numbers, num) {
    let times = 0
    for (let i = 0; i < numbers.length; i++) {
      if (num === numbers[i]) {
        times++
      }
    }
    if (times * 2 <= numbers.length) {
      return false
    }
    return true
  }
}

console.log(moreThanHalfNumSolution([1, 1, 2, 3, 1]))