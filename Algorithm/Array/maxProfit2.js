/**
 * @param {number[]} prices
 * @return {number}
 */

 var maxProfit2 = function(prices) {
   var maxValue = 0
   var change = 0
   for(var i = 1,iL = prices.length;i < iL;i++) {
     change = prices[i] - prices[i - 1]
     if(change > 0) {
       maxValue += change
     } 
   }
   return maxValue
 }

console.log(maxProfit2([7,1,5,3,6,4]))
