/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/*
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
] 
*/
var permute = function (nums) {
  let result = []
  // 排序一下不然
  nums.sort((a, b) => a > b)
  find(nums, [])
  
  return result

  function find(nums, templateList) {
    // 回朔结果登记
    if(nums.length == 0) {
      result.push(templateList.slice())
    }
  
    // 回朔主体
    for(let i = 0;i < nums.length; i++) {
      templateList.push(nums[i])
      let copy = nums.slice()
      copy.splice(i, 1)
      // 入口
      find(copy, templateList)
      // 每次出来处理
      templateList.pop()
    }
  }
}

