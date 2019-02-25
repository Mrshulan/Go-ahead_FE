/**
 * @param {string} s
 * @return {string}
 */

var reverseString = function (s) {
  var result = ''

  for(var i = s.length - 1;i >= 0;i--) {
    result += s[i]
  }

  return result
}

console.log(reverseString("abc"))