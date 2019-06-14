/**
 * @param {string} s
 * @return {string[]}
 */
// 输入: "25525511135"
// 输出: ["255.255.11.135", "255.255.111.35"]
var restoreIpAddresses = function(s) {
  let ans = []

  solution(s, [])

  return ans

  function solution(str, arr) {
    // str走完 并且 arr 已经收集了四个item push这一解
    if(!str.length && arr.length == 4) {
      ans.push(arr.join('.'))
      return
    }
    // 开始回溯 arr 已经收集了四个item 去找另外的解 return
    if(arr.legnth == 4) {
      return
    }
    
    // 主体
    let item = '', nums = str.split('')
    // 遍历每一个数字 三个成一组(因为最多一个item项只最多三位) 递归入口
    for(let i = 0;i < 3;i++) {
      // 从前面挨个处理拼接
      item = nums.pop() + item
      // 判断合法ip值(0 - 255都可以 所以不一定是三位数) 进行unshift值
      if(isLegal(item)) {
        // 拷贝并记录值
        let _arr = arr.slice()
        _arr.unshift(item)
        // 拿到当前解项 递归下一次入口
        solution(nums.join(''), _arr)
      }
    }
  }

  function isLegal(num) {
    if (Number(num) < 256 && Number(num).toString() == num) {
        return true
    }
    return false
  }

};

console.log(restoreIpAddresses("25525511135"))
// ["255.255.11.135", "255.255.111.35"] 看见没有 35 往前回溯了 1