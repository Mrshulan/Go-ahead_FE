
/**
 * @param {number} n
 * @return {string[]}
 */
// 记录左右数量平衡的回溯
var generateParenthesis = function (n) {
  let result = []
  let res = ''
  helper(res, 0, 0)

  return result


  function helper (res, open, close) {
    if(res.length === 2 * n) {
      result.push(res)
      return
    }
  
    if(open < n) helper(res + '(', open + 1, close)
    if(close < open) helper(res + ')',open, close + 1)
  }
};

console.log(generateParenthesis(3))

