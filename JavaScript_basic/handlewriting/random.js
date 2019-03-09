var times = [0,0,0,0,0]
var res = {}

for(var i = 0;i < 100000;i++) {
  var values = [1, 2, 3, 4, 5]

  values.sort(function() {
    return Math.random() - 0.5
  })
  var key = JSON.stringify(values)
  res[key] ? res[key]++ : res[key] = 1

  times[values[4] - 1]++
}

// console.log(times)
// console.log(res)
// 维持原有数据的概率最高 以及 第一次的百分之50的概率 1 2 交换比较大
// [ 6189, 6258, 12609, 24897, 50047 ]
// '[1,2,3,4,5]': 6411,
// '[2,1,3,4,5]': 6374,

// v8 在处理 sort 方法时，当目标数组长度小于 10 时，使用插入排序；反之，使用快速排序和插入排序的混合排序
function InsertionSort(a, from, to) {
  for(var i = from + 1; i < to;i++) {
    // 插入排序视第一个元素为有序的，所以数组的外层循环从 i = 1 开始
    var element = a[i]
    // 当待排序元素跟有序元素进行比较时，
    // 一旦确定了位置，就不会再跟位置前面的有序元素进行比较，所以就乱序的不彻底
    for(var j = i - 1; j >= from;j--) {
      var tmp = a[j]
      var order = compareFn(tmp, element)

      if(order > 0) {
        a[j + 1] = tmp
      } else {
        break
      }
    }

    a[j + 1] = element
  }
}

function shuffle(a) {
  var i, x, j
  // 遍历数组元素，然后将当前元素与以后随机位置的元素进行交换要注意这个length
  for(i = a.length;i;i--) {
    // 包括自己 与下边的不包括自己是不一样的 种类是两倍
    j = Math.floor(Math.random() * i)

    x = a[i - 1]
    a[i - 1] = a[j]
    a[j] = x
  }
}

function shuffle(arr) {
  let len = arr.length
  
  const random = ([a, b], c) => {
    let randomNum = Math.floor(Math.random() * (b - a + 1) + a)

    return randomNum === c ? random([a, b], c) : randomNum
  }

  for(let i = 0;i < 3 * len;i++) {
    let _i = i % len
    
    let r = random([0, len - 1], _i);
    [arr[_i], arr[r]] = [arr[r], arr[_i]]

    // r = random([0, len - 1], _i)[arr[_i], arr[len - 1 - r]] = [arr[len - 1 -r], arr[_i]]
    // r = num[a, b] = [b, a]
    // 数字加[]  其实也就是对其property访问 然后又,运算符又参与了(num 只是一个临时的装箱对象) 直接看等号最左 最右边 所以 r就变成了数组 解构失效
    r = random([0, len - 1], _i); // 这个分号不打结果就 只有一半了 也就是只有上边的生效(不包括自己)
    [arr[_i], arr[len - 1 - r]] = [arr[len - 1 - r], arr[_i]]
  }

  return arr
}


var timesShuffle = [0, 0, 0]
var resShuffle = {}
var count = 0

for(var i = 0;i < 100000;i++) {
  var values = [1, 2, 3]

  values = shuffle(values)
  var key = JSON.stringify(values)
  resShuffle[key] ? resShuffle[key]++ : resShuffle[key] = 1

  timesShuffle[values[2] - 1]++
}

console.log(timesShuffle)
console.log(resShuffle)
console.log(Object.keys(resShuffle).length)
