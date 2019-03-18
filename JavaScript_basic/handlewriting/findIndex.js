function findIndex (array, predicate, context) {
  for(var i = 0;i < array.length;i++) {
    if(predicate.call(context, array[i], i, array)) return i
  }

  return -1
}

function findLastIndex(array, predicate, context) {
  var length = array.length

  for(var i = length - 1;i >= 0;i--) {
    if(predicate.call(context, array[i], i, array)) return i
  }

  return -1
}

// underscore简化代码
function createIndexFinder (dir) {
  return function (array, predicate, context) {
    var length = array.length
    var index = dir > 0 ? 0 : length - 1
    for(; index >= 0 && index < length; index += dir) {
      if(predicate.call(context, array[index], index, array)) return index
    }
    return -1
  }
}

// sortedIndex
function cb(func, context) {
  if(context === void 0) return func

  return function () {
    return func.apply(context, arguments)
  }
}
function sortedIndex(array, obj, iteratee, context) {
  iteratee = cb(iteratee, context)

  var low = 0, high = array.length
  while(low < high) {
    var mid = Math.floor((low + high) / 2)
    if(iteratee(array[mid]) < iteratee(obj)) low = mid + 1
    else high = mid 
  }

  return high
}


function createIndexOfFinder(dir, predicate, sortedIndex) {
  // dir是正向还是last  idx是指从哪开始找
  return function(array, item, idx) {
    var length = array.length
    var i = 0

    if(typeof idx === 'number') {
      if(dir > 0) {
        // indexOf 大于0 前边开始 小于0 抵消个数(负值才是倒数第几个开始找)
        i = idx >= 0 ? idx : Math.max(length + idx, 0)
      } else {
        // lastIndexOf （无论正负都是 第的概念）如果为负值，将其视为从数组末尾向前的偏移 length就会改变 因为后边 -1(即整个数组都会被查找)  所以这里就要加1
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1
      }
    } else if(sortedIndex && idx && length) {
      idx = sortedIndex(array, item)
      // 如果要插入的位置的值正好等于元素的值
      return array[idx] === item ? idx : -1
    }

    // 判断是否是NaN
    if(item !== item) {
      // 从截取好的数组中查找第一个满足isNaN函数的元素的下标
      idx = predicate(array.slice(i, length), isNaN)
      return idx >= 0? idx + i : -1
    }
    // 确定是indexOf 还是lastIndexOf  idx还是控制好的
    for(idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if(array[idx] === item) return idx
    }

    return -1
  }
}
