/**
 * @param {string[]} strs
 * @return {string}
 */

var longestCommonPrefix = function(strs) {
  var result = strs.length > 0 ? strs[0] : ''

  for(var i = 1,iL = strs.length;i < iL;i++) {
    if(!strs[i].startsWith(result)) {
      for(var j = 0,jL = result.length;j < jL;j++) {
        if(result[j] !== strs[i][j]) {
          result = result.slice(0, j)
        }
      }
    }
  }

  return result
}

console.log(longestCommonPrefix(["flower","flow","flight"]))