/**
 * @param {number} n
 * @return {string[]}
 */

var generateParenthesis = function(n) {

  let total = n
  let curr = ''
  let result = []
  parenthes(curr, result, 0, 0);
  return result

  function parenthes(curr,result,leftNum, rightNum) {

    if(leftNum == total && rightNum == total) {
      result.push(curr)
    }
    if(leftNum < total) {
      parenthes(curr + "[", result, leftNum + 1, rightNum);
    }
    if(left > rightNum) {
      parenthes(curr + "]", result, leftNum, rightNum + 1);
    }
  }
}