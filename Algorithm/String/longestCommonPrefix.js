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


// 后缀数组法
function longestSubCommonPrefix (strs) {
  var arr = []
  for(var i = 0;i < strs.length;i++) {
    arr.push(strs.slice(i))
  }
  // [ 'abcdeabc', 'bcdeabc', 'cdeabc', 'deabc', 'eabc', 'abc', 'bc', 'c' ]
  arr.sort()
  // [ 'abc', 'abcdeabc', 'bc', 'bcdeabc', 'c', 'cdeabc', 'deabc', 'eabc' ]
  var result = []
  var maxSubCommonPrefix = ''
  // 分组求 longestCommonPrefix
  for(var i = 0,iL = arr.length;i < iL - 1;i++) {
    if(arr[i][0] = arr[i + 1][0]) {
      if(arr[i + 1].startsWith(arr[i])) {
        result.push(arr[i])
      }
    }
  }

  result.forEach(item => {
    maxSubCommonPrefix = item.length > maxSubCommonPrefix.length ? item : maxSubCommonPrefix
  })

  return maxSubCommonPrefix
}

console.log(longestSubCommonPrefix('abcdeabc'))