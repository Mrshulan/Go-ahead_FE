/**
 * @param {number[]} nums
 * @return {number}
 */


// 偶数房间的金额之和与奇数房间的金额之和 又要使用动规(提现在 Math.max)
 var rob = function (nums) {
   var even = 0
   var odd = 0

   for(var i = 0;i < nums.length;i++) {
     if(i % 2 === 0) {
       even = Math.max(even + nums[i], odd)
     } else {
       odd = Math.max(odd + nums[i], even)
     }
   }

   return Math.max(even, odd)
 }

