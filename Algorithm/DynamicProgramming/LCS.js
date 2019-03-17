function lcs(wordX, wordY) {
  var m = wordX.length
  var n = wordY.length
  var l = []
  var i, j, a, b

  for(i = 0;i <= m;i++) {
    l[i] = []
    for(j = 0;j <= n;j++) {
      l[i][j] = 0
    }
  }

  for(i = 0;i <= m;i++) {
    for(j = 0;j <= n;j++) {
      if(i == 0 || j ==0) {
        l[i][j] = 0
        // 注意i 在外 j 在里边的遍历 这个 == 的意思
      } else if(wordX[i - 1] == wordY[j - 1]) {
        // 遍一次i 全遍 j 矩阵比左比上边
        l[i][j] = l[i - 1][j - 1] + 1
      } else {
         a = l[i - 1][j] // 上一行
         b = l[i][j - 1] // 左边
         l[i][j] = (a > b) ? a : b // 动规核实
      }
    }
  }

  return l[m][n]
}