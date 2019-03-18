// 字符串仅由小写字母和[,]构成，且字符串不包含多余的空格（阿里的提示，携程没有）

// 示例一：‘abc’->{value:'abc'}

// 示例二：‘[abc[bcd[def]]]’->{value:'abc',children:{value:'bcd',children:{value:'def'}}}


function normalize(str) {
  var result = {}

  if(str.indexOf('[') == -1){				  //判断两种字符串，并分别处理
		result.value = str
		return result
	} else {
    var arr = str.replace(/]/g, '').slice(1).split('[')
    var temp = result
  
    for(var i = 0,iL = arr.length;i < iL;i++) {
      temp.value = arr[i]
      if(i !== arr.length - 1) {
        temp = temp.children = {}
      }
    }
  }

  return result
}

console.log(normalize('abc'))
console.log(normalize('[abc[bcd[def]]]'))