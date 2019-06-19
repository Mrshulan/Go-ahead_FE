let { join } = require('path')
let fs = require('fs')

let findedPath = []
let filePath = join(__dirname, process.argv[2])
let lookingFor = process.argv[3]

// 递归查询(不包括node_modules)
let recursiveReadFile = (fileName) => {
  if(!fs.existsSync(fileName)) return
  if(isFile(fileName)) {
    check(fileName)
  }

  if(isDirectory(fileName) && !(/node_modules/.test(fileName))) {
    let files = fs.readdirSync(fileName)
    // 检查当前目录下的文件
    files.forEach((val) => {
      let tempPath = join(fileName, val)

      if(isDirectory(tempPath)) recursiveReadFile(tempPath)
      if(isFile(tempPath)) check(tempPath)
    })
  }

  // helper
  function check(fileName) {
    let data = readFile(fileName)
    let reg = new RegExp(lookingFor, 'g')
    // let reg = /<template is="mg" data="\{\{\.\.\.\$mg\}\}"\/>/g

    if(reg.test(data)) findedPath.push(fileName)
  }

  function isDirectory(fileName) {
    if(fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory() 
  }
  function isFile(fileName) {
    if(fs.existsSync(fileName)) return fs.statSync(fileName).isFile()
  }
  function readFile(fileName) {
    if(fs.existsSync(fileName)) return fs.readFileSync(fileName, 'utf-8')
  }
}

recursiveReadFile(filePath)

console.log(`您在 ${filePath} 路径下查询到 ${lookingFor} 相关文件路径共${findedPath.length}:`)
console.log(findedPath)