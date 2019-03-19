let template = ''
let idReg = /[\s\W]/g
const cache = {}

// 成功替换操作
const add = tpl => {
  return tpl.replace(/[\r\n\t]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/{%=\s*([^%}]+?)\s*%}/g, ");arr.push($1);arr.push('")
    .replace(/{%/g, ");")
    .replace(/%}/g, "arr.push('")
}

const tmpl = (str, data) => {
  let result = `let p = []; arr.push('`

  if(!idReg.test(str)) {
    template = document.getElementById(str).innerHTML
    if(cache[str]) {
      // return cache[str](data)
      return cache[str].apply(data)
    }
  } else {
    template = str
  }

  result += add(template)
  result += "'); return arr.join('');"
  
  // 转化化为可以执行的js代码 缺点双重解析损失性能
  // let fn = new Function(data, result)
  let fn = new Function(result)
  // 在传入id的情况下存入缓存
  if(!cache[str] && !idReg.test(str)) {
    cache[str] = fn
  }
  // return fn(data)
  return fn.apply(data)
}
