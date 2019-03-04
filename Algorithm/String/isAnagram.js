/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

var isAnagram = function(s, t) {
  if(s.length !== t.length) return false
  var _s = s.split('').sort().join('')
  var _t = t.split('').sort().join('')

  if(_s !== _t) return false

  return true
}

console.log(isAnagram("anagram", 'nagaram'))