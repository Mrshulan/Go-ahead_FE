// 两个任意大的整数相加的时候，既不会溢出，也不会损失精度
function sumStrings(a, b) {
  var res = ''
  var c = 0

  a = a.split('')
  b = b.split('')

  while(a.length || b.length || c) {
    // ~~取整运算 非数化0 true化1 保证若b的长度大于a的长度，则此时a.pop()=undefined，~~undefined=0
    c += ~~a.pop() + ~~b.pop()
    // 开启字符串拼接 
    res = c % 10 + res
    // 需要进位 true 会是 1 false 会是0
    c = c > 9 
  }

  // 去除前面的0
  return res.replace(/^0*/, '')
} 


var a = '87349238473285973856723867325';
var b = '0000034324382582347583275834758437853843853445';

console.log(sumStrings(a,b));