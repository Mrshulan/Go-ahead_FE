/* 
其难点就在于思路，我们可以反着想，不去想机器人往哪里走，而去想机器人从哪里来，然后一直回溯。
由题目可知，机器人只能从左或者从上走过来
就很容易得出其状态转移方程为:
如果当前没有障碍物，dp[m][n] = dp[m - 1][n] + dp[m][n - 1]
如果有障碍物，则dp[m][n] = 0
 */
var uniquePathsWithObstacles = function (obstacleGrid) {

  if(obstacleGrid.length === 0) return 0
  if(obstacleGrid[0][0]) return 0

  let dp = []

  for(let i = 0;i < obstacleGrid.length;i++) {
    dp[i] = []
  }
  // 初始化第一个方法 供 +
  dp[0][0] = 1

  for(let i = 0;i < obstacleGrid.length;i++) {
    for(let j = 0;j < obstacleGrid[0].length;j++) {
      // 自己就不考虑了
      if(!i && !j) continue

      // 遇到障碍 设置为0
      if(obstacleGrid[i][j]) {
        dp[i][j] = 0
      } else {
        // dp[m][n] = dp[m - 1][n] + dp[m][n - 1]
        dp[i][j] = (i ? dp[i - 1][j] : 0) + (j ? dp[i][j - 1] : 0) 
      }
    }
  }

  return dp[obstacleGrid.length - 1][obstacleGrid[0].length - 1] 
}

console.log(uniquePathsWithObstacles( [
  [0,0,0],
  [0,1,0],
  [0,0,0]
  ]))