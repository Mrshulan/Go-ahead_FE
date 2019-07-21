/* 
牛牛以前在老师那里得到了一个正整数数对(x, y), 牛牛忘记他们具体是多少了。
但是牛牛记得老师告诉过他x和y均不大于n, 并且x除以y的余数大于等于k。
牛牛希望你能帮他计算一共有多少个可能的数对。
 */
// 重在搞明白里边的关系

var line = readline().split(' ');
var n = parseInt(line[0]);
var k = parseInt(line[1]);

function main(n, k) {
  var res = 0;

  if(k === 0) {
    res = n * n;
  } else {
    // 余数大于k，则除数也就是y要大于k，而余数是从0到y-1循环的
    for(var y = k+1; y <= n;y++) {
      // 对于每个y值，因为x要去除y，x从1到n包含n/y个余数循环,
      // 每个余数循环中只有y-k个符合条件的。因为y>k   => 直接相乘即为匹配个数
      res += (Math.floor(n / y)) * (y -k);
      // >=k 表示还有不完整余数循环，余数为该循环的数字个数
      if(n % y >= k) {
        res += n % y - k + 1;
      }
    }
  }

  print(res);
  return res;
}

main(n, k);

// 5 2
// 满足条件的数对有(2,3),(2,4),(2,5),(3,4),(3,5),(4,5),(5,3)
// => 7
