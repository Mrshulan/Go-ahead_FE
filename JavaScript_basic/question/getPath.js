const source  = "a[0].b['cd'].e";

// \1\2同于匹配环节 $1$2用于替换环节
// /2 => ('|") 输入的是' 实际上是 字符 \'
// console.log("['b[']".match(/((?<=\[('|")).+(?=\2\]))/))


// 配套一堆 再切割
var getPath =(str) => str.replace(/\[(')?([^\.]+?)\1?\]/g, ".$2").split('.')

// match输出答案 注意 | 的顺序
var getPath = (str) => str.match(/((?<=\[('|")).+(?=\2\]))|([a-z0-9_"])+/gi)

const test = [
  [
    "a.b",
    ['a', 'b']
  ],
  [
    "a._",
    ['a', '_']
  ],
  [
    "a[0]",
    ['a', '0']
  ],
  [
    "a['0']",
    ['a', '0']
  ],
  [
    "a['b']",
    ['a', 'b']
  ],
  [
    "a.b['c'][0]",
    ['a', 'b', 'c', '0']
  ],
  [
    "a['b[']",
    ['a', 'b[']
  ],
  [
    `a['a"b']`,
    ['a', 'a"b']
  ]
]

for(const [source, target] of test) {
  console.log(JSON.stringify(getPath(source)) === JSON.stringify(target))
}

// console.log(getPath("a[0].b['cd'].e"));  // ['a', '0', 'b', 'cd', 'e']
// console.log(getPath("a.b['c'][0]"));  // ['a', '0', 'b', 'cd', 'e']
// console.log(getPath(`a['b[']`));  // ['a', '0', 'b', 'cd', 'e']
// console.log(getPath(`a['a"b']`));  // ['a', '0', 'b', 'cd', 'e']
