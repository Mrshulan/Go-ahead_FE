/**
 * @param {string} str
 * @return {number}
 */

var myAtoi = function(str) {
  var i = 0
  var sign = 1
  var num = 0

  // 跳过空格 判断符号
  while(str[i] === ' ') i++
  if(str[i] === '-' || str[i] === '+') {
    if(str[i] === '-') sign = -1
    i++
  }

  for(var iL = str.length; i < iL;i++) {
    if(48 <= str[i].charCodeAt() && str[i].charCodeAt() <= 57) {
      num = num * 10 + +str[i]
    } else {
      break
    }
  }
  num *= sign

  // 超出判断
  if(num > Math.pow(2, 31) - 1) {
    return Math.pow(2, 31) - 1
  }
  if(num < -Math.pow(2, 31)) {
    return -Math.pow(2, 31)
  }

  return num
}

console.log(myAtoi("-4193 with words"))

