const fetch = require('node-fetch')
// 判断Ip是否在中国
const isInChinaByIp = async (ip) => {
  let queryRes

  if(ip) {
    queryRes = await fetch(`http://freeapi.ipip.net/${ip}`).then(msg => {
      return msg.json()
    })
  } else {
    queryRes = await fetch('http://myip.ipip.net').then(msg => {
      return msg.text()
    })
  }

  if(queryRes.includes('中国')) {
    return true
  }

  return false
}

// 判断域名是不是在中国
const isInChinaByDomain = async (url='mrshulan.com') => {
  let ip = '0.0.0.0'
  const fetchData = await fetch(`http://site.ip138.com/domain/read.do?domain=${url}`).then(res => res.json())
  
  // Domain DNS 变成 IP
  if(fetchData.status === true && fetchData.code === 300) {
    ip = fetchData.data[0].ip
  } else {
    return '请检查你的域名'
  }

   return await isInChinaByIp(ip)
}

exports.isInChinaByIp = isInChinaByIp
exports.isInChinaByDomain = isInChinaByDomain