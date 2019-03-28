/* 
['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 
和
['A', 'B', 'C', 'D']
合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D'] 
*/
let a1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let a2 = ['A', 'B', 'C', 'D'].map(item => {
  return item + 3
})

let a3 = [...a1, ...a2].sort().map(item => {
  if(item.includes('3')) {
    return item.replace(/\d/g, '')
  }

  return item
})

console.log(a3)