/**
 * @param {number[]} digits
 * @return {number[]}
 */

var plusOne = function(digits) {
  var carry = 1
  var index = digits.length - 1

  while(carry && index >= 0) {
    if(digits[index] === 9) {
      digits[index] = 0
      index--
    } else {
      digits[index]++
      carry = 0
    }
  }

  if(carry) {
    digits.unshift(1)
  }

  return digits
}

console.log(plusOne([4,3,2,9]))