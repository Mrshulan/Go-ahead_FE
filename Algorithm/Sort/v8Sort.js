// v8 是 Chrome 的 JavaScript 引擎，其中关于数组的排序完全采用了 JavaScript 实现。

// 排序采用的算法跟数组的长度有关，当数组长度小于等于 10 时，采用插入排序，大于 10 的时候，插入排序的混合排序方法。

function compareFn(a, b) {
  return a - b
}

function insectionSort(arr) {
  for(var i = 1;i < arr.length;i++) {
    var element = arr[i]

    for(var j = i -1;j >= 0;j--) {
      var tmp = arr[j]
      var order = tmp - element
      if(order > 0) {
        arr[j + 1] = tmp
      } else {
        break
      }
    }

    arr[j + 1] = element
  }

  return arr
}

// 然而这种实现方式需要额外的空间用来储存左右子集，所以还有一种原地(in-place)排序的实现方式。
var quickSort = function(arr) {
  if(arr.length <= 1) return arr

  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]

  var left = []
  var right = []

  for(var i = 0;i < arr.length;i++) {
    if(arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([pivot], quickSort(right))
}

// in-place
function quickSort(arr) {
  function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b]
    arr[b] = temp
  }

  function partition(arr, left, right) {
    var pivot = arr[left]
    var storeIndex = left

    for(var i = left + 1;i <= right;i++) {
      if(arr[i] < pivot) {
        // 把小于pivot的统统挨个移到自己边上
        swap(arr, ++storeIndex, i)
      }
    }
    // pivot当分界线
    swap(arr, left, storeIndex)
    // 返回pivot现在的位置 也就是一个分隔的分界线
    return storeIndex
  }

  function sort(arr, left, right) {
    if(left < right) {
      var storeIndex = partition(arr, left, right)
      // 进行下一步的基准校验 如果取到第一个基准 下边第一个就不会进行拉
      sort(arr, left, storeIndex - 1)
      sort(arr, storeIndex + 1, right)
    } else {
      return 
    }
  }

  sort(arr, 0, arr.length - 1)

  return arr
}


// 基准获取
// 当数组长度大于 10 但是小于 1000 的时候，取中间位置的元素，实现代码为：
// third_index = from + ((to - from) >> 1); 当于除以 2 (忽略余数)
// 长度大于 1000 的时候
// 15 的二进制为： 1111，这就意味着任何和 15 按位与的结果都会小于或者等于 15，这才实现了每隔 200 ~ 215 个元素取一个值
function getThirdIndex(a, from, to) {
  var t_array = new Array()
  var increment = 200 + ((to - from) & 15)

  var j = 0
  from += 1
  to -= 1
  // 每隔 200 ~ 215 个元素取一个值，然后将这些值进行排序
  for(var i = from; i < to;i += increment) {
    t_array[j] = [i, a[i]]
    j++
  }
  // 对随机挑选的这些值进行排序
  t_array.sort(function (a, b) {
    return compareFn(a[i], b[i])
  })
  // 取中间值的下标
  var third_index = t_array[t_array.length >> 1][0]
  return third_index
}

function insertionSort(a, from, to) {
  for(var i = from + 1;i < to; i++){
    var element = a[i]

    for(var j = i - 1; j >= 0; j--) {
      var tmp = a[j]
      var order = compareFn(tmp, element)

      if(order > 0){
        a[j + 1] = tmp
      } else {
        break
      }
    }
    a[j + 1] = element
  }
}

function quickSort(a, from, to) {
  var third_index = 0
  while(true) {

    if(to - from <= 10) {
      insertionSort(a, from, to)
      return
    }
    if(to - from > 1000) {
      third_index = getThirdIndex(a, from, to)
    } else {
      third_index = from + ((to - from) >> 1)
    }

    var v0 = a[from]
    var v1 = a[to - 1]
    var v2 = a[third_index]

    var c01 = compareFn(v0, v1)
    if(c01 > 0) {
      var tmp = v0
      v0 = v1
      v1 = tmp
    }
    // 保证v0 <= v1
    var c02 = compareFn(v0, v2)
    if(c02 >= 0) {
      // v2 <= v0 <= v1
      var tmp = v0
      v0 = v2
      v2 = v1
      v1 = tmp
      // v0 <= v1 <= v2
    } else {
      // v0 <= v1 && v0 < v2
      var v12 = compareFn(v1, v2)
      if(v12 > 0) {
        var tmp = v1
        v1 =v2
        v2 = tmp
      }
      // v0 <= v1 <= v2
    }

    // 保证了v0 <= v1 <= v2
    a[from] = v0
    a[to - 1] = v2

    var pivot = v1
    var low_end = from + 1
    var high_start = to - 1

    // 放到中间
    a[third_index] = a[low_end]
    // 效果还是初始为pivot ???
    a[low_end] = pivot

    partition: for(var i = low_end + 1; i < high_start;i++) {
      var element = a[i]
      var order = compareFn(element, pivot)

      if(order < 0) {
        a[i] = a[low_end]
        a[low_end] = element
        low_end++
      } else if(order > 0) {
        do {
          hign_start--
          if(high_start == i) break partition
          var top_elem = a[high_start]
          order = compareFn(top_elem, pivot)
        } while(order > 0)

        a[i] = a[high_start]
        a[high_start] = element

        if(order < 0) {
          element = a[i]
          a[i] = a[low_end]
          a[low_end] = element
          low_end++
        }
      }
    }

    if(to - high_start < low_end - from) {
      QuickSort(a, hign_start, to)
    } else {
      QuickSort(a, from, low_end)
      from = hign_start
    }

  }
}
