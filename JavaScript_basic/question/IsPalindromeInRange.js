/* 
121 / 1221 1231不是对称数
从1000 到 990000里边找出所有对称数
*/

for(let i = 1000;i<990000;i++){
  if(i == i.toString().split('').reverse().join('')){
      console.log(i)
  }
}


for(let i = 10;i<=989;i++){
  let res = i.toString()+ i.toString().split('').reverse().join('')
  console.log(res)
}

