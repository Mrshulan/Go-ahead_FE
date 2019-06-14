/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  for(let x = 0;x < board.length;x++) {
    for(let y = 0;y < board[0].length;y++) {
      if(find(board,word,x, y, 0)) return true
    }
  }

  return false
};

function find(board, word, x, y, d) {
  // 结果处理 和 回溯的条件 
  if(d == word.length) return true // 存在有的判断
  if(x < 0 || y < 0 || x == board.length || y === board[x].length) return false // 递归边界
  if(board[x][y] != word[d]) return false // 上下左右查找的如果不是

  // 因为只能记录一次位置 不能重复 可以先tmp拿出来
  let tmp = board[x][y]
  board[x][y] = '*'
  // 水平 垂直 走一波
  let exist = find(board, word, x, y + 1, d + 1) 
    || find(board, word, x, y - 1, d + 1)
    || find(board, word, x + 1, y, d + 1)
    || find(board, word, x - 1, y, d + 1)
  board[x][y] = tmp
  return exist
}


const board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
console.log(exist(board, "ABCCED"))
console.log(exist(board, "SEE"))
console.log(exist(board, "ABCB"))
console.log(exist([["C", "A", "A"], ["A", "A", "A"], ["B", "C", "D"]], "AAB"))

