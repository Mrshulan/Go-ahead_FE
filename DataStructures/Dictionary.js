class Dictionary {
  constructor() {
    this.items = {}
  }

  set(key, value) {
    this.items[key] = value
  }

  get(key) {
    return this.items[key]
  }

  remove(key) {
    delete this.items[key]
  }

  // 键数组(静态属性)
  get keys() {
    return Object.keys(this.items)
  }
  // 值数组
  get values() {
    // return Object.values(this.items)
    return Object.keys(this.items).reduce((r, c) => {
      r.push(this.items[c])
      return r
    }, [])
  }
}

const dictionary = new Dictionary()
dictionary.set("shulan", "shulan@163.com")
dictionary.set("shuita", "shuita@163.com")
dictionary.set("jimmie", "jimmie@163.com")

// console.log(dictionary)
// console.log(dictionary.keys)
// console.log(dictionary.values)
// dictionary.remove('shuita')
// console.log(dictionary.items)
