/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if(!digits) return []

  var map = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"]
  };
  // 第一个字符对应数组 (同时也作为forEach 最后的结果)
  var ans = map[digits[0]]
  // 之后的字符
  digits = digits.substring(1)
  // 主体就是这个forEach map 的配合
  digits.split('').forEach(function (digit) {
    var arr = []

    map[digit].forEach(function (letter) {
      arr = arr.concat(ans.map(function (item) {
        return item + letter
      }))
    })

    ans = arr
  })

  return ans
};

console.log(letterCombinations("23"))
console.log(letterCombinations("233"))