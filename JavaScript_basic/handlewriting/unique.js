var array = [1, 1, '1', '1']


function unique(array) {
  var res = []

  for(var i = 0,iL = array.length;i < iL;i++) {
    for(var j = 0,iL = res.length;j < iL;j++) {
      if(array[i] === res[j]) {
        break
      }
    }
    
    // 如果都不相等 j 就会等于res.length (var)
    if(j === jL) {
      res.push(array[i])
    }
  }

  return res
}

function unique (array) {
  var res = []

  for(var i = 0,iL = array.length;i < iL;i++) {
    var current = array[i]
    if(res.indexOf(current) === -1) {
      res.push(current)
    }
  }

  return res
}

function unique(array) {
  var res = []
  var sortedArray = array.concat().sort()
  var seen

  for(var i = 0,iL = sortedArray;i < iL;i++) {
    // 不是第一个元素 且 与 前一个seen不同
    if(!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i])
    }

    seen = sortedArray[i]
  }

  return res
}

// underscore _.unique
function unique(array, isSorted, iteratee) {
  var res = []
  var seen = []

  for(var i = 0,iL = array.length;i < iL;i++) {
    var value = array[i]
    var computed = iteratee ? iteratee(value, i, array) : value

    if(isSorted) {
      if(!i || seen !== computed) {
        res.push(value)
      }
      seen = computed
    } else if (iteratee) {
      if(seen.indexOf(computed) === -1) {
        seen.push(computed)
        res.push(value)
      }
    } else if(res.indexOf(value) === -1) {
      res.push(value)
    }
  }

  return res
}

function unique(array) {
  var res = array.filter(function(item, index, arr) {
    return array.indexOf(item) === index
  })

  return res
}
// sort之后处理方式
function unique(array) {
  var res = array.concat().filter(function (item, index, arr) {
    return !index || item !== array[index - 1]
  })

  return res
}


function unique(array) {
  var obj = {}

  return array.filter(function(item, index) {
    // 如果都是对象的话object[object Object]  typeof item + JSON.stringify(item) 
    // 因为 1 和 '1' 是不同的，但是这种方法会判断为同一个值
    // 因为键值对只能是字符串所以可以加一个typeof + 拼接
    return obj.hasOwnProperty(typeof item + item) ?  false : (obj[typeof item + item] = true)
  })
}

function unique(array) {
  return Array.from(new Set(array))
}

var unique = array => [...new Set(array)]