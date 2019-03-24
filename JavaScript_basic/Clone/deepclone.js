function clone(source) {
  let target = null
  let type = Object.prototype.toString.call(source)

  // 问题代码
  // for(var key in source) {
  //   if(source.hasOwnProperty(key)) {
  //     if(typeof source[key] === 'object') {
  //       target[key] = clone(source[key])
  //     } else {
  //       target[key] = source
  //     }
  //   }
  // }


  if(type === '[object Array]') {
    target = []
    for (let i = 0,iL = source.length;i < iL;i++) {
      // 避免一层死循环
      target[i] = source[i] = source ? target : clone(source[i])
    }
  } else if (type === '[object Object]') {
    target = {}
    for (let key in source) {
      if(source.hasOwnProperty(key)) {
        target[key] = source[key] === source ? target : clone(source[key])
      }
    }
  } else {
    // 基本类型什么的
    // 如果是其他类型就直接返回 比方说下面 target["name"] = "shulan" 👆
    return source
  }

  return target
}

// console.log(clone({name: "shulan"}))

// // 没有对参数做检测 判断是否是对象逻辑不够严谨 没有考虑数组兼容 循环引用直接卡死你(爆栈)


/* 
* deep 深度
* breadth 广度
*/

function createData (deep, breadth) {
  var data = {}
  var temp = data

  for(var i = 0;i < deep;i++) {
    temp = temp['data'] = {}

    for(var j = 0;j < breadth;j++) {
      temp[j] = j
    }
  }

  return data
}

// console.log(createData(2, 3))
// console.log(createData(3, 1))
// clone(createData(1000)) // 莫得问题
// // clone(createData(10000)) Maximum call stack size exceeded
// clone(createData(10, 100000)) // 深度大了会爆栈 广度就不会


// function cloneJSON(source) {
//   return JSON.parse(JSON.stringify(source))
// }

function cloneJSON(source, errOrDef = true) {
  let type = Object.prototype.toString.call(source)
  
  // 一假则假 尽早退出
  if(type !== '[object Object]' && type !== '[object Array]') return source

  try {
    return JSON.parse(JSON.stringify(source))
  } catch(err) {
    if(errOrDef === true) {
      // 错误默认设置
      throw(err)
    } else {
      console.error("cloneJSON Error: " + err.message)
      
      return errOrDef
    }
  }
}


// 看来也是采用递归的方法
// cloneJSON(createData(10000)) // Maximum call stack size exceeded

// var a = {}
// a.a = a

// 循环引用报错 采用的是 循环检测
// cloneJSON(a, false) // Converting circular structure to JSON

// var a = {
//   a1: 1,
//   a2: {
//     b1: 1,
//     b2: {
//       c: 1
//     }
//   }
// }

// 其实就是一颗树
// 循环遍历一棵树，借助一个栈，当栈为空时说明遍历完，栈里边存放下一个要拷贝的节点
// 消除爆栈两条路1 消除尾递归 2 不用递归采用循环

function cloneLoop(source) {
  let type = Object.prototype.toString.call(source)
  // 根节点
  const target = null

  if(type === '[object Object]') {
    target = {}
  } else if (type === '[object Array]') {
    target = []
  }

  // parent记录的拷贝位置
  // key存放哪一个父元素(如果是对象的话)的子元素拷贝对象 记录拷贝的索引下标
  const loopList = [
    {
      parent: target,
      key: undefined,
      data: source
    }
  ]
  // 遍历当前节点下的子元素，如果是对象就放到栈里，否则直接拷贝
  while(loopList.length) {
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data
    const typeTemp = Object.prototype.toString.call(data)

    let res = parent

    if(typeof key !== 'undefined') {
      // / 循环进来 parent记录的上一个的值 不是对象就是数组 重新给这个位置 parent[key] 初始化
      res = parent[key] = typeTemp === "[object Object]" ? {} : []
    }

    if(typeTemp === '[object Array]') {
      for(let i = 0,iL = data.length;i < iL;i++){
        let typeInner = Object.prototype.toString.call(data[i])

        if(data[i] === data) {
          res[i] = res
        } else if (typeInner === "[object Object]" || typeInner === "[object Array]") {
          loopList.push({
            parent: res,
            key: i,
            data: data[i]
          })
        } else {
          res[i] = data[i]
        }
      }
    } else if (typeTemp === '[object Object]') {
      for(let k in data) {
        let typeInner = Object.prototype.toString.call(data[k])

        if(data.hasOwnProperty(k)) {
          if(data[k] === data) {
            res[k] = res
          } else if(typeInner === "[object Object]" || typeInner === "[object Array]") {
            loopList.push({
              parent: res,
              key: k,
              data: data[k]
            })
          } else {
            res[k] = data[k]
          }
        }
      }
    }

    // for(let k in data) {
    //   if(data.hasOwnProperty(k)) {
    //     if(typeof data[k] === "object"){
    //       loopList.push({
    //         parent: res,
    //         key: k,
    //         data: data[k]
    //       })
    //     } else {
    //       res[k] = data[k]
    //     }
    //   }
    // }
  }

  return target
}


// 改用循环后，不会出现爆栈，但是对于循环引用依然无力应付um... 多次引用？

// 首先的看一下引用丢失
var b = {}
var a = {a1: b, a2: b}
// // 这里是单纯的引用
// console.log(a.a1 === a.a2) // true

// // 这里就会新创建一个{} <-原因就在于此
var c = clone(a)
console.log(c.a1 === c.a2) // false

var d = cloneForce(a)
console.log(d)
console.log(d.a1 === d.a2) // true 保持住引用关系


// 引入一个数组uniqueList 存储已经拷贝的数组，每次循环遍历的时候，判断是否在 uniquList 在就不执行拷贝逻辑了
// cloneForce在对象数据量很多的时候出现很大的问题 数据量很大不适合使用cloneForce
function cloneForce (source) {
  const uniqueList = []
  let target = null

  // 根节点
  if(type === '[object Object]') {
    target = {}
  } else if(type === '[object Array]'){
    target = []
  }

  // target 和 source 这非常好理解这循环
  const loopList = [{
    parent: target,
    key: undefined,
    data: source
  }]

  while(loopList.length) {
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data
    const typeTemp = Object.prototype.toString.call(data)

    let res = parent
    if(typeof key !== 'undefined') {
      res = parent[key] = typeTemp === "[object Object]" ? {} : []
    }

    let uniqueData = find(uniqueList, data)
    // 如果在的话就不执行拷贝逻辑了
    if(uniqueData) {
      // source命中缓存 不要用 res[] 您看看引用
      parent[key] = uniqueData.target
      continue
    }

    // res的就是复制的结果
    uniqueList.push({
      source: data,
      target: res
    })

    if(typeTemp === '[object Array]') {
      for(let i = 0,iL = data.length;i < iL;i++) {
        
        if(data[i] === data) {
          res[i] = res
        } else if(isClone(data[i])) {
          loopList.push({
            parent: res,
            key: i,
            data: data[i]
          })  
        } else {
          res[i] = data[i]
        }
      }
    } else if (typeTemp === '[object Object]') {
      for(let k in data) {
        if(data.hasOwnProperty(k)) {
          if(data[k] === data) {
            res[k] = res
          } else if (isClone(data[k])) {
            loopList.push({
              parent: res,
              key: k,
              data: data[k]
            })
          } else {
            res[k] = data[k]
          }
        }
      }
    }
  }

  return target
}

function find(arr, item) {
  for(let i = 0;i < arr.length;i++) {
    if(arr[i].source === item) {
      return arr[i]
    }
  }

  return null
}

function isClone(source) {
  let type = Object.prototype.toString.call(source)

  return type === "[object Object]" || type === "[object Array]"
}