// 集合三特性  确定性 互异性 无序性
class Set {
  constructor() {
    this.items = {}
  }

  has(value) {
    return this.items.hasOwnProperty(value)
  }

  add(value) {
    if(!this.has(value)) {
      this.items[value] = value

      return true
    }

    return false
  }

  remove(value) {
    if(this.has(value)) {
      delete this.items[value]

      return true
    }

    return false
  }

  get size() {
    return 
  }

  get size() {
    return Object.keys(this.items).length
  }

  get values() {
    return Object.values(this.items)
  }

  // 并集
  union(otherSet) {
    const unionSet = new Set()

    this.values.forEach((v) => unionSet.add(v))
    otherSet.values.forEach((v) => unionSet.add(v))

    return unionSet
  }

  // 交集
  intersection(otherSet) {
    const intersection = new Set()

    this.values.forEach((v, i) => {
      if(otherSet.has(v)) {
        intersection.add(v)
      }
    })

    return intersection
  }

  // 差集
  difference(otherSet) {
    const difference = new Set()

    if(this.size > otherSet.size) {
      this.values.forEach(v => {
        if(!otherSet.has(v)) {
          difference.add(v)
        }
      })
    } else {
      otherSet.values.forEach(v => {
        if(!this.has(v)) {
          difference.add(v)
        }
      })
    }

    return difference
  }

  // 判断是否是子集
  subSet(otherSet) {
    if(this.size > otherSet.size) {
      return false
    } else {
      return this.values.every(v => otherSet.has(v))
    }
  }
}

const set = new Set()
const otherSet = new Set()
set.add(1)
set.add(2)
set.add(3)
otherSet.add(1)
otherSet.add(2)
otherSet.add(3)
otherSet.add(4)

// console.log(set.union(otherSet))
// console.log(set.intersection(otherSet))
// console.log(set.difference(otherSet))
// console.log(set.subSet(otherSet))