let { spawn } = require('child_process')
let lookingFor = process.argv[2]
let filePath = process.argv[3]

// 默认 pipe  (inherit ignore 达不到要求)
// 由于该目录下我写了两个方法所以就多了一次-v反向 [单独使用变通一哈即可]
let child = spawn('grep', [lookingFor, '.', '-r', '-n', filePath, '--exclude-dir', 'node_modules'])
let grepReverse1 = spawn('grep', ['-v', 'spawn.js'])
let grepReverse2 = spawn('grep', ['-v', 'regexp.js'])

// | 传输的过程
child.stdout.on('data', (data) => {
  grepReverse1.stdin.write(data)
})
grepReverse1.stdout.on('data', (data) => {
  grepReverse2.stdin.write(data)
})
grepReverse2.stdout.on('data', (res) => {
  console.log(res.toString())
})

// 上一个close 意味着 传输此次end
child.on('close', (code) => {
  if (code !== 0) {
    console.log('child exit code: ', code)
  }  
  grepReverse1.stdin.end()
})
grepReverse1.on('close', (code) => {
  if(code !== 0) {
    console.log('grepReverse1 exit code: ', code)
  }
  grepReverse2.stdin.end()
})

grepReverse2.on('close', (code) => {
  if(code !== 0) {
    console.log('grepReverse2 exit code: ', code)
  } else {
    console.log('search successful')
  }
})


// node 封装 grep
// grep '2' . -r -n  '../js' --exclude-dir node_modules | grep -v  regexp.js | grep -v  spawn.js
