/**
 * @param {number} N 行
 * @param {number} K 列
 * @return {number}
 */
// 如果把每一行都这么求出来 时间复杂度肯定爆表
/* 
第一行: 0
第二行: 01
第三行: 0110
第四行: 01101001
找出其中的与上一行的关系(递归自上而下)
当 k 为偶数时，它的值 = n-1行的 k/2  == 0 ？ 1 ：0 
当 k 为奇数时，它的值 = n-1行的 (k+1)/2 == 0 ?  0 : 1 
*/
// O(n) O(1) 递归(父变体)
var kthGrammar = function(N, K) {
    if(N == 1) return 0

    if(K % 2 == 0) {
      return kthGrammar(N - 1, K / 2) == 0 ?  1 : 0
    } else {
      return kthGrammar(N - 1, (K + 1) / 2) == 0 ? 0 : 1
    }
}
// 递归（翻转变体） O(n) O(1)   1 << N - 2 => 上上行翻倍(1开始不用担心 且1过滤掉了) 也就是 上行个数
var kthGrammar = function (N, K) {
  if(N == 1) return 0
  if(K <= 1 << N - 2) {
    return kthGrammar(N - 1, K)
  }
  return kthGrammar(N - 1, K - (1 << N - 2)) ^ 1 // 取反
}


// 二进制计数 O(logN) O(1) 如果logN 是有界的，那么可以将其视作 O(1)O(1)
// 当索引 K 写为二进制形式后（从 0 开始索引），后半部分的索引的第一位总是 1。
// 这意味着，当使用方法三中的算法时，我们翻转最终答案的次数仅仅是 K-1 的二进制表示中的 1 的个数。 % 2
// 0    0
// 1    1
// 10   1
// 11   0
// parseInt(K - 1, 2) <= 这个肯定不行 javasript 似乎不行(没有转进制输出？) => toString大法
var kthGrammar = function (N, K) {
  
  return hammingWeight(K - 1) % 2


  function hammingWeight (n) {
    let numArr = n.toString(2).split('')
    let count = 0

    for(let val of numArr) {
      if(val === '1') {
        count++
      }
    }

    return count
  };
}

console.log(kthGrammar(2, 2))
console.log(kthGrammar(4, 5))
