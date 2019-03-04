/**
 * @param {number} n
 * @return {string}
 */

var countAndSay = function (n) {
  var ans = '1'

  if(n === 1) return ans
  for(var i = 1;i < n;i++){
    ans = say(ans)
  }

  function say(s) {
    // 记录上一个的字符和出现个数
    var preChar = s[0]
    var preCharCount = 1
    var ans = ''

    for(var i = 1,iL = s.length;i < iL;i++) {
      if(s[i] === preChar) {
        preCharCount++
      } else {
        ans += preCharCount + preChar
        preCharCount = 1
        preChar = s[i]
      }
    }
    ans += preCharCount + preChar

    return ans
   }

  return ans
}

console.log(countAndSay(5))