//  用[2,9,3]组合一个最大的不超过23456的数字

function atMostNGivenDigitSet (D, N) {
  var arr = D.sort((a, b) => a < b)
  var res = ''

  for( var i = 0;i < N.length;i++) {
    res += arr.find(x => x <= +N[i])
  }

  return res
}

console.log(atMostNGivenDigitSet([2, 9, 3], "23456"))