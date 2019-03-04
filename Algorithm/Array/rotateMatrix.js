/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

var rotate = function(matrix) {
  var len = matrix.length - 1
  var temp = 0

  // source target 进行旋转替换
  for(var x = 0;x < parseInt((len + 1) / 2);x++) {
    for(y = x;y < len -x;y++) {
      temp = martix[x][y]
      martix[x][y] = martix[len - y][x]
      martix[len - y][x] = martix[len - x][len - y]
      martix[len - x][len - y] = martix[y][len - x]
      martix[y][len - x] = temp
    }
  }

}

var martix = [
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
]

rotate(martix)

console.log(martix)