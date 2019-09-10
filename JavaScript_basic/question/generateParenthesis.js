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
      return result.push(curr)
    }
    if(leftNum < total) {
      parenthes(curr + "[", result, leftNum + 1, rightNum);
    }
    if(leftNum > rightNum) {
      parenthes(curr + "]", result, leftNum, rightNum + 1);
    }
  }
}

// [ '[[[]]]', '[[][]]', '[[]][]', '[][[]]', '[][][]' ]
console.log(generateParenthesis(3))