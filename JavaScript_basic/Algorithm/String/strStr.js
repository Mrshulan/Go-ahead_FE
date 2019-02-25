/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

 var strStr = function (haystack, needle) {
   var len = needle.length

   if(!len) return 0
   for(var i = 0,iL = haystack.length;i < iL - len;i++) {
     if(haystack.slice(i, i + len) === needle) return i
   }

   return -1
 }

 console.log(strStr('hello', "ll"))