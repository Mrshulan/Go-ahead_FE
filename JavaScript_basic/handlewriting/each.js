function each(obj, callback) {
  var length, i = 0
  var isArrayLike = function (collection) {
    var length = collection.length
    return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
  }

  if(AisArrayLike(obj)) {
    length = obj.length
    for(; i < length;i++) {
      if(callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  } else {
    for(i in obj) {
      if(callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  }

  return obj
}
// for 和 each 比较 each时间比较长 根本原因在于call性能损失