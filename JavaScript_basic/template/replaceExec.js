let tpl = ''
let match = []

const cache = []
const idReg = /[\s\W]/g
const tplReg = /<%=?\s*([^%>]+?)\s*%>/g
const keyReg = /((for|if|else|switch|case|break|{|}))/g


const add = (str, result, isJs) => {
  str = str.replace(/[\r\n\t]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")

  // 三种情况：JavaScript语句、JavaScript变量、HTML结构。
  result += isJs ? str.match(keyReg) ? `${str}` : `arr.push(${str});` : `arr.push('${str}');`
  return result
}

const tmpl = (str, data) => {
  let cursor = 0
  let result = `let arr = []`

  if(!idReg.test(str)) {
    tpl = document.getElementById(str).innerHTML

    if(cache[tpl]) {
      return cache[str].apply(data)
    }
  } else {
    tpl = str
  }

  // expc返回的是子串数组 g全局匹配 还有每次都会更新记忆位置 最后归0
  while(match = tplReg.exec(tpl)) {
    result = add(tpl.slice(cursor, match.index), result) // HTML结构
    result = add(match[0], result, true) // JavaScript语句或者变量
    cursor = match.index + match[0].length  // 更新HTML结构初始提取位置 cursor光标
  }

  result = add(tpl.slice(cursor), result) // 提取后边剩下的一点点
  result += `return result.join("")` // 拼接

  let fn = new Function(result)

  // 在传入Id的时候开启缓存
  if(!cache[str] && !idReg.test(str)) {
    cache[str] = fn
  }

  return fn.apply(data)
}
