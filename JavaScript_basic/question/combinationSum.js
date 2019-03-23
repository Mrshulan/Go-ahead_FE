// function findGroup(arr, n, sum) {
//   if(sum === 0 && n === 0) {
//     return true
//   } else if(n < 0) {
//     return false
//   }

//   if(n > 0) {
//     for(var i = 0;i < arr.length;i++) {
//       var temp = arr.slice(i+1)

//       return findGroup(temp, n - 1,sum - arr[i]) || findGroup(temp,n,sum)
//     }
//   }
// }
// // 成功返回true，失败返回false
// console.log(findGroup([1,2,3,4,5,6,7],4,19))



// 回溯算法，不断试错，错误的话，回到上个状态，换参数继续
var candidates = [2, 3, 8, 4, 10, 15]
var target = 9

function combinationSum (candidates, target) {
  const buffer = []
  const result = []

  const backTrace = (index, target) => {
    // 恰好合就是这个值了
    if(target === 0) {
      return result.push(buffer.slice())
    }

    // 回溯标记
    if(target < 0) {
      return
    }

    if(index === candidates.length) return

    buffer.push(candidates[index])
    backTrace(index + 1, target - candidates[index])
    // 回溯开始
    // 遇到target < 0 不满足了 赶紧剥离这个值
    buffer.pop()
    // 还原操作
    backTrace(index + 1, target)
  }

  backTrace(0, target)

  return result.filter(item => item.length === 3)
}

console.log(combinationSum(candidates, target))