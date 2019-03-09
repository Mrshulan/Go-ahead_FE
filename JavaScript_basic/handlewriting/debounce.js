function debounce(func, wait, immediate) {
  var timeout, result

  var debounced = function () {
    var context = this
    var args = arguments

    if(timeout) clearTimeout(timeout)
    if(immediate) {
      // 仅执行一次
      // 第一次timeout肯定是没有的 所有callNow是true
      var callNow = !timeout
      // 延迟清空timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      // 首次立即执行
      if(callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        result = func.apply(context, args)
      }, wait)
    }

    return result
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}