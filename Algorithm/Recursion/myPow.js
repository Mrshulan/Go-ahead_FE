/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// 92ms
var myPow = function (x, n) {
  if(n == 0) {
    return 1
  }
  if(n < 0) {
    n = -n
    x = 1 / x
  }

  return (n % 2 == 0) ? myPow(x * x, parseInt(n / 2) ) : x * myPow(x * x, parseInt(n / 2))
}

var myPow = function(x, n) {
  return x**n
}

// 60ms
var myPow = function(x, n) {
  if(0 === n) {return 1;}
  if(1 === n) {return x;}
  if(-1 === n) {return 1/x;}
  
  if(0 === n%2) {
      let half = myPow(x,n/2);
      return half * half;
  } else return x * myPow(x, n - 1);
  
};

console.log(myPow(2.0, 2))
console.log(myPow(2.0, 3))