/*
对于字符串x和y,
如果擦除x中的某些字母(有可能全擦掉或者都不擦)能够得到y,我们就称y是x的子序列。
例如."ncd"是"nowcoder"的子序列,而"xt"不是
输出一个字符串,即 字典序 最大的s的子序列。 
nowcoder => wr
test => tt
*/


// 从后面找单调递增的不连续序列
function getSeq(str) {
  var arr = str.split('')
  var temp = arr[arr.length - 1]
  var res = [temp]

  for(var i = arr.length - 2;i >= 0;i--) {
    if(arr[i] >= res[res.length - 1]) {
      res.push(arr[i])
    }
  }

  return res.reverse().join('')
}

console.log(getSeq("test"))
console.log(getSeq("nowcoder"))