import data from './3.js'
data.push(3)
console.log('中间2(这样是不会抽离的, 第一不是nodemodule 第二不是多页的引用(minchunk比较适用),)','2.js push 3', data)