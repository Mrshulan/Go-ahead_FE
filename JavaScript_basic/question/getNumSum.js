/* 
const source  = {
  count: 1,
  price: 800,
  name: 'Good boy',
  stuff: {
    book: 3,
    childStuff: {
      car: 4,
      bag: 3
    }
  }
}
getSum(source);
// 811 (1 + 800 + 3 + 4 + 3) */

var getNumSum = (source) => {
  // 边界
  if(typeof source === 'number')  return source
  // 过滤不是数字 (其实这里有的点浪费) Array同样适用Object.values()
  if(source === null || typeof source !== 'object' ) return 0

  return Object.values(source).reduce((pre, curr) => pre + getNumSum(curr), 0)
}


// // 捷径:前提是要符合stringify的要求 和格式基本要求
// var getNumSum = (source) => {
//   return JSON.stringify(source).match(/\d+/g).reduce((pre, curr) => pre + Number(curr), 0)
// }





const test = [
  [
    '0.题目内示例',
    {
      "count": 1,
      "price": 800,
      "name": "Good boy",
      "stuff": {
        "book": 3,
        "childStuff": {
          "car": 4,
          "bag": 3
        }
      }
    },
    811
  ],
  [
    '1.最简单情况',
    {
      "a": "First",
      "b": 3,
      "c": 4,
      "d": -10,
      "e": {
        "f": 3.3,
        "g": 3.7
      }
    },
    4
  ],
  [
    '2.字符串数字',
    {
      "a": "First",
      "b": "Second",
      "c": "4",
      "d": "10",
      "e": {
        "f": 3.3,
        "g": 3.7
      }
    },
    7
  ],
  [
    '3.数字数组',
    {
      "a": "First",
      "b": "Second",
      "c": "4",
      "d": "10",
      "e": [3.3, 3.7]
    },
    7
  ],
  [
    '4.集合数组',
    {
      "a": "First",
      "b": "Second",
      "c": "4",
      "d": "10",
      "e": [
        {"f": 3.3},
        {"g": 3.7}
      ]
    },
    7
  ],
  [
    '5.最外层是数组',
    [
      1, 2, {
        "a": 1
      }
    ],
    4
  ],
  [
    '6.Infinity',
    {
      "a": 0,
      "b": "Second",
      "c": "4",
      "d": "10",
      "e": [
        {"f": 1.7976931348623157e+308},
        {"g": 1.7976931348623157e+308}
      ]
    },
    Infinity
  ],
  [
    '7.混合数据类型',
    {
      "a": [null, 1, 3, [1, 3], false],
      "b": {
        "a": 4,
        "b": true
      }
    },
    12
  ],
  [
    '8.没有数字',
    {
      "a": "First",
      "b": "Second",
      "c": "4",
      "d": "10",
      "e": [
        {"f": "d"},
        {"g": "d"}
      ]
    },
    0
  ],
  [
    '9.只有一个数字',
    {
      "a": "First",
      "b": "Second",
      "c": "4",
      "d": "10",
      "e": [
        {"f": 3},
        {"g": "d"}
      ]
    },
    3
  ],
  [
    '10.加分项-JSON Value：不作为正确与否的判断',
    3,
    3
  ],
  [
    '11.加分项-非JSON：不作为正确与否的判断',
    new Date(),
    0
  ]
];


for(var item of test) {
  console.log(getNumSum(item))
}