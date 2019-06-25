/**
 * @param {number} num
 * @return {boolean}
 */

function isUgly(number) {
  if(number == 0) {
    return false
  }

  while(number !== 1) {
    if( number % 2 === 0) {
      number /= 2
    } else if (number % 3 === 0) {
      number /= 3
    } else if (number % 5 === 0) {
      number /= 5
    } else {
      return false
    }
  }

  return true
}


console.log(isUgly(6))
console.log(isUgly(14))