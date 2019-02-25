/**
 * @param {string} s
 * @return {boolean}
 */

var isPalindrome = function (s) {
  s = s.replace(/[^\w]/g, '')
  if(!s) return true
  var start = 0
  var end = s.length - 1

  while(start < end) {
    if(s[start].toLowerCase() !== s[end].toLowerCase()) return false
    start++
    end--
  }

  return true
}

console.log(isPalindrome("A man, a plan, a canal: Panama"))