/**
 * @param {number} x
 * @return {number}
 */

 var reverseInteger = function(x) {
   if(!x) return 0
   var flag = x > 0 ? true : false
   var res = 0

   x = x > 0 ? x : -x
   while(x) {
     res = res * 10 + x % 10
     if(flag) {
       if(res > Math.pow(2, 31) - 1) return 0
     } else {
       if(res >Math.pow(2, 31)) return 0
     }
     x = parseInt(x / 10)
   }

   return flag ? res : -res
 }

 console.log(reverseInteger(120))