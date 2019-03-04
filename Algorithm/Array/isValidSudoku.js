/**
 * @param {character[][]} board
 * @return {boolean}
 */

var isValidSudoku = function (board) {

  // 遍历每一行
  for(var arr of board) {
    var row = []

    arr.forEach(num => {
      if(num !== '.') row.push(num)
    })
    if(new Set(row).size !== row.length) return false
  }

  // 遍历每一列
  for(var idx = 0;idx < 9;idx++) {
    var col = []

    for(var arr of board) {
      if(arr[idx] !== '.') col.push(arr[idx])
    }

    if(new Set(col).size !== col.length) return false
  }

  // 遍历3*3矩阵
  for(var x = 0;x < 9;x += 3) {
    for(var y = 0;y < 9;y += 3) {
      var box = []

      for(var i = x;i < x + 3;i++) {
        for(var j = y;j < y + 3;j++) {
          if(board[i][j] !== '.') box.push(board[i][j])
        }
      }

      if(new Set(box).size !== box.length) return false
    }
  }

  return true
}

var example = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]

console.log(isValidSudoku(example))