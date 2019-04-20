/*
// 修改原型 注意此时sessionStorage 和 localStorage 都会具有这个方法
// localStorage只能存储字符，存入时将对象转为json字符串,读取时也要解析
Storage.prototype.setExpire = (key, value, expire) => {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire
  }

  localStorage.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getExpire = (key) => {
  let val = localStorage.getItem(key)

  if(!val) {
    return val
  }

  val = JSON.parse(val)

  if(Date.now() - val.time > val.expire) {
    localStorage.removeItem(key)
    return null
  }

  return val.data
}
 */



// JSON.parse JSON.stringify 做出简单深拷贝
class Storage {
  constructor() {
    this.source = window.localStorage

    this.initRun()
  }
  // 初始化做出了优化
  initRun() {
    // 匹配一波有特殊要求的
    const reg = new RegExp('__expires__')
    let data = this.source
    // for in 使用hasOwnProperty方法过滤或Object.keys会返回自身可枚举属性组成的数组
    let list = Object.keys(data)

    if(list.length > 0) {
      list.map((key, v) => {
        if(!reg.test(key)) {
          let now = Date.now()
          let expires = data[`${key}__expires__`] || Date.now() + 1

          if(now > expires) {
            this.remove(key)
          }

          return key
        }
      }) 
    }
  }
  // set 额外${key}__expires__
  set(key, value, expired) {
    let source = this.source

    source[key] = JSON.stringify(value)

    if(expired) {
      source[`${key}__expires__`] = Date.now() + expired
    }

    return value
  }
  // get 额外${key}__expires__ 与 当前 Date.now() 做出比较
  get(key) {
    let source = this.source

    expired = source[`${key}__expires__`] || Date.now() + 1

    const now = Date.now()

    if(now >= expired) {
      this.remove(key)
      return
    }

    const value = source[key] ? JSON.parse(source[key]) : source[key]

    return value
  }

  remove(key) {
    const data = this.source
    const value = data[key]

    delete data[key]
    delete data[`${key}__expires__`]

    return value
  }
  
}

