const { isInChinaByIp, isInChinaByDomain } = require('./index')
const fetch = require('node-fetch')

// npm源这个ip解析不出来 但是我们可以测试 taobao npm的 resolve速度(Promise.race的思路)
const urlMap = {
  npm: "registry.npmjs.org",
  npmCom: 'npmjs.com',
  taobaonpm: "registry.npm.taobao.org",
  baidu: 'baidu.com',
  google: 'google.com', // 中国台湾
  github: 'github.com'
}

const registryMap = {
  npm: "https://registry.npmjs.org",
  taobaonpm: "https://registry.npm.taobao.org",
}
// 并发处理普通Domain
const getUrlSource = async() => {
  const promise = (url) => {
    return new Promise (resolve => {
      isInChinaByDomain(url).then(res => {
          resolve({target: url, res: res})
      })
    })
  }
  const promises = Object.keys(urlMap).map( key => {
    return promise(urlMap[key])
  })

  return await Promise.all(promises)
}

// race法处理Domain
const getRegistrySource = async () => {
  return new Promise(resolve => {
    Object.keys(registryMap).forEach(async key => {
      // 利用其阻塞 resolve控制权后移
      await fetch(registryMap[key])
      resolve({ target: registryMap[key], res: true })
    })
  })
}

console.log(`你当前所处于的ip环境${isInChinaByIp() ? '在' : '不在'}中国`)
getUrlSource().then(res => {console.log(res)})
getRegistrySource().then(res => {console.log(res)})

