/**
 * @param {string} S
 * @return {string[]}
 */
// 输入: S = "a1b2"

// 输出: ["a1b2", "a1B2", "A1b2", "A1B2"]

// 输入: S = "3z4" 输出: ["3z4", "3Z4"]

// 输入: S = "12345" 输出: ["12345"]
// 简单的分支回朔
var letterCasePermutation = function(S) {
  var res = []
  
  backtrack(S, 0, res)
  
  return res

  function backtrack(S, i, res) {
    if(i == S.length) {
      res.push(S)
      return
    }

    backtrack(S, i + 1, res)
    // 回朔出来
    if(S[i] > "9") {
      if(S[i].charAt() > 96) {
        S = S.replace(S[i], (item) => item.toLowerCase())
      } else {
        S = S.replace(S[i], (item) => item.toUpperCase())
      }
      // 递归进去 
      backtrack(S, i + 1, res)
    }
  }
};

// 将字符与数字分开，是数字直接添加 如果是字母 添加大小写 temp作为临时项
var letterCasePermutation = function (S) {
  var res = [""]

  for(var i = 0;i < S.length;i++) {
    if("0".charCodeAt() <= S.charCodeAt(i) && "9".charCodeAt() >= S.charCodeAt(i)) {
      for(var j = 0;j < res.length;j++) res[j] += S[i]
    } else {
      // jL 提前 切莫 j < res.length
      for(var j = 0, jL = res.length;j < jL;j++) {
        var temp = res[j]
        res[j] += S[i].toLowerCase()
        res.push(temp + S[i].toUpperCase())
      }
    }
  }

  return res
}

console.log(letterCasePermutation("a1b2"))
console.log(letterCasePermutation("123"))

