
// var fibonacci = (function () {
//   var memory = {}
//   return function(n) {
//     if(n == 0 || n == 1) {
//       return n
//     }
//     if(memory[n-2] === undefined) {
//       memory[n-2] = fibonacci(n-2)
//     }
//     if(memory[n-1] === undefined) {
//       memory[n-1] = fibonacci(n-1)
//     }
//     return memory[n] = memory[n-1] + memory[n-2]
//   }
// })()

// 尾递归优化
function fibonacci(n, n1 = 0, n2 = 1) {
  // 尾递归直接输出结果
  if(n <= 1) {
    if(n == 0) return 0
    return n2
  }
  return fibonacci(n - 1, n2, n1 + n2)
}

// 迭代
function fibonacci (n) {
  // 从 n = 1 开始叠算 也就是n=2时候  等于 0 + 1
  let arr = [0, 1]
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i-1] + arr[i-2]
  }
  return arr[n]
}

// 动态规划
function fibonacci (n) {
  let dp = []

  if(n == 0){
      return 0
  }
  for(let i = 0;i < n;i++){
      if(i < 2){
          dp.push(1)
      } else {
          dp.push(dp[dp.length-1]+dp[dp.length-2])
      }
  }
  return dp[dp.length-1]
}

console.log(fibonacci(0))
console.log(fibonacci(1))
console.log(fibonacci(2))
console.log(fibonacci(3))
// 0 1 1 2