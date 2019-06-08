/**
 * @param {string} s
 * @return {string}
 */

var reverseString = function (s) {
  var result = ''

  for(var i = s.length - 1;i >= 0;i--) {
    result += s[i]
  }

  return result
}

var reverseString = function(s) {
  let l = s.length;
  let sArr = s.split('')
  if(l < 1){
     return s
  }else{
     let mid = Math.floor(l/2)
     for(let i = 0 ; i < mid ; i++){
        [sArr[i], sArr[l - i - 1]] = [sArr[l - i - 1], sArr[i]]
     }
    return sArr.join('')
  }
}

// 递归
// 你的解决方案对我来说是O(n²).对子字符串的调用很可能是O(n) – 典型的实现将为新字符串分配空间,然后复制子字符串. 字符串连接可能也是O(n).甚至可能是长度为O(n)的情况,但我认为这是不太可能的.
// 编译器可以将递归(多一个回归的流程)转换为迭代的想法.这是事实,但它很少在函数式语言和Scheme之外实现;并且通常唯一应用的转换是尾递归消除.在你的代码中,递归不在尾部位置：在递归调用反转之后,你仍然需要计算.因此,尾递归消除不适用于您的代码.

// 这意味着反转的迭代版本必须以不同的方式实现.它可能具有相同或不同的复杂性,在我们看到它之前我们不能说.
var reverseString = (s) => (s.length > 1) ? s.charAt(s.length - 1) + reverseString(s.substring(0,s.length-1)): s
console.log(reverseString("abcd"))