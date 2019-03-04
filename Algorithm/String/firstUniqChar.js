/**
 * @param {string} s
 * @return {number}
 */

var firstUniqChar = function (s) {
  for(var i of s) {
    if(s.indexOf(i) === s.lastIndexOf(i)) return s.indexOf(i)
  }

  return -1
}

console.log(firstUniqChar("loveleetcode"))