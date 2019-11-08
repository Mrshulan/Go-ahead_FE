const loaderUtils = require('loader-utils')
const fs = require('fs')
const path = require('path')

module.exports = function (source) {
  const { name } = loaderUtils.getOptions(this)

  const url = loaderUtils.interpolateName(this, "[name]_[contentHash:4].[ext]", {
    content: source
  })

  console.log("url", url)
  console.log("name:", name)
  // loader-runner并不支持 需要在context手动配置这个函数测试
  this.emitFile(path.join(__dirname, url), source)


  const json = JSON.stringify(source)
    .replace('foo', '')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  // // 异步callback返回
  // this.cacheable(false)
  // const callback = this.async()
  // fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
  //   if(err) {
  //     callback(err, '')
  //   }

  //   callback(null, data)
  // })

  // throw new Error('A small error occurred')

  return `export default ${json}`
  // this.callback(null, json, 2, 3, 4)
}