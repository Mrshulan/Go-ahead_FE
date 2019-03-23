function getQueryString (str) {
  var result = str.match(/[?&][^?&]+=[^?&]+/g)
  if(result == null) {
    return []
  }

  for(var i =0,iL = result.length;i < iL;i++) {
    result[i] = result[i].substring(1)
  }

  return result
}

var searchPath = '?type=2&order=0&pos=13&page=1'

console.log(getQueryString(searchPath))