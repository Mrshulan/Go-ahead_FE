/* interface IterfaceResult {
  done: boolean;
  value: any
}

interface Ierator {
  next(): IneratorResult
}

interface Iterable {
  [Symbol.iterator](): Iterator
}

Iterable(可迭代对象有个方法 返回迭代器)
-> Iterator(迭代器有关next方法 返回迭代器结果)
-> IterfaceResult(迭代器结果[value: "", done: ]) */

const items = [1, 2, 3, 4, 5]

const sequence = {
  [Symbol.iterator]() {
    let i = 0

    return {
      next() {
        const value = items[i++]
        const done = i > items.length

        return {value, done}
      }
    }
  }
}

// Array(类数组) String Set Map 都是具备可迭代对象 
// for of, [...iterable], Array.from(iterable)
// for in 设计是为了 枚举对象
// for in  Array#forEach 不会遍历 不适用于可迭代对象 并且forEach() 首次就确定了遍历长度 不会动态
// console.log([...sequence])

// for(var key in items){
//   console.log(key)
// }
// items.forEach((key) => {console.log(key)})

const random = {
  [Symbol.iterator]: () => ({
    next: () => ({value: Math.random(), done: false})
  })
}
// ()不加的结果 Result of the Symbol.iterator method is not an object
// JS stack trace 内存满
// console.log([...random])
// console.log(Array.from(random))

// 解构赋值或给for...of循环设置退出条件
const [one, another] = random
console.log(one, another)