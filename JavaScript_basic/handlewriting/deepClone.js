// 如果要考虑symbol对象的时候 可以getOwnPropertySymbols得到数组 额外处理就好
function clone(source) {
  var target = null
  var type = Object.prototype.toString.call(source)

  if(type === '[object Array]') {
    target = []
    for(let i = 0,iL = source.length;i < iL;i++) {
      target[i] = source[i] === source ? target : clone(source[i])
    }
  } else if(type === '[object Object]') {
    target = {}
    for(var key in source) {
      if(source.hasOwnProperty(key)) {
        target[key] = source[key] === source ? target : clone(source[key])
      }
    }
  } else {
    return source
  }

  // 问题代码 没有对参数做检测 判断是否是对象逻辑不够严谨 没有考虑数组 循环引用直接卡死你
  // for(var key in source) {
  //   if(source.hasOwnProperty(key)) {
  //     if(typeof source[key] === "object") {
  //       target[key] = clone(source[key])
  //     } else {
  //       target[key] = source[key]
  //     }
  //   }
  // }

  return target
}
// 递归的方法 深度大了会爆栈 广度就不会

function createData (deep, breadth) {
  var data = {}
  var temp = data

  for(var i = 0;i < deep;i++) {
    // 堆地址在迭代
    temp = temp['data'] = {}
    for(var j = 0;j < breadth;j++) {
      temp[j] = j
    }
  }

  return data
}


function cloneJSON(source, errDef = true) {
  let type = Object.prototype.toString.call(source)

  // 尽早退出
  if(type !== '[object Object]' && type !== "[object Array]") return source

  try {
    return JSON.parse(JSON.stringify(source))
  } catch(err) {
    if(errDef === true) {
      throw(err)
    } else {
      console.error("cloneJSON Error: " + err.message) 
      return errDef
    }
  }
}
// 也是采用 递归 和 循环检测(解决循环引用)


function cloneLoop(source) {
  let type = Object.prototype.toString.call(source)
  let target = null

  if(type === '[object Object]') {
    target = {}
  } else if (type === '[object Array]') {
    target = []
  }

  /* 
  * 栈区
  * parent 代表宿主地址(拷贝环境)
  * key 代表宿主的位置(键值 或者 索引下标)
  * data 代表拷贝的对象
  */
  const loopList = [
    {
      parent: target,
      key: undefined,
      data: source
    }
  ]

  // 凡是array或者object 入栈
  while(loopList.length) {
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data
    const typeTemp = Object.prototype.toString.call(data)

    let res = parent
    // key的作用在这里(不是第一次才需要开辟新空间)
    if(typeof key !== 'undefined') {
      res = parent[key] = typeTemp === '[object Object]' ? {} : []
    }

    if(typeTemp === '[object Array]') {
      for(let i = 0,iL = data.length;i < iL;i++) {
        let typeInner = Object.prototype.toString.call(data[i])
        // 循环引用
        if(data[i] === data) {
          res[i] = res
        } else if (typeInner === '[object Object]' || typeInner === '[object Array]') {
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
      for(let key in data) {
        let typeInner = Object.prototype.toString.call(data[key])
        
        if(data.hasOwnProperty(key)) {
          if(data[key] === data)  {
            res[key] = res
          } else if(typeInner === '[object Object]' || typeInner === '[object Array]') {
            loopList.push({
              parent: res,
              key: key,
              data:data[key]
            })
          } else {
            res[key] = data[key]
          }
        }
      }
    }
  }

  return target
}
// 循环引用比较鸡肋(并且引用丢失(新开辟的空间地址)) 可以利用cache 


function cloneForce (source) {
  const cacheList = []
  let type = Object.prototype.toString.call(source)
  let target = null

  if(type === '[object Object]') {
    target ={}
  } else if (type === '[object Array]') {
    target = []
  }

  const loopList = [
    {
      parent: target,
      key: undefined,
      data: source
    }
  ]

  while(loopList.length) {
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data
    const typeTemp = Object.prototype.toString.call(data)

    let res = parent

    if(typeof key !== 'undefined'){
      res = parent[key] = typeTemp === '[object Object]' ? {} : []
    }

    let cacheData = find(cacheList, data)
    // 命中
    if(cacheData) {
      parent[key] = cacheData.target
      continue
    }

    cacheList.push({
      source: data,
      target: res
    })

    if(typeTemp === '[object Array]') {
      for(let i = 0,iL = data.length;i < iL;i++) {
        let typeInner = Object.prototype.toString.call(data[i])

        if(typeInner === '[object Object]' || typeInner === '[object Array]') {
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
      for(let key in data) {       
        if(data.hasOwnProperty(key)) {
          let typeInner = Object.prototype.toString.call(data[key])

          if (typeInner === '[object Object]' || typeInner === '[object Array]') {
            loopList.push({
              parent: res,
              key: key,
              data: data[key]
            })
          } else {
            res[key] = data[key]
          }
        }
      }
    }
  }
  
  return target
}

function find(arr, item) {
  for (let i = 0,iL = arr.length;i < iL;i++) {
    if(arr[i].source === item) {
      return arr[i]
    }
  }

  return null
}









