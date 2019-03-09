var escapeMap = {
  '&': '&amp;',
  '<':'&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'":'&#27;',
  '`': '&#60;'
}

var escape = function (string) {
  var escaper = function(match) {
    return escapeMap[match]
  }

  var source = '(?:' + Object.keys(escapeMap).join('|') + ')';
  var testRegexp = RegExp(source)
  var replaceRegexp = RegExp(source, 'g')

  string = string == null ? '': '' + string

  return testRegexp.test(string) ? string.replace(replaceRegexp,escaper) : string
}

var unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x60;': '`'
}


var unescape= function (string) {
  var unescaper = function(match) {
    return unescapeMap[match]
  }

  var source = '(?:' +Object.keys(unescapeMap).join('|') + ')'
  var testRegexp = RegExp(source)
  var replaceRegexp = RegExp(source, 'g')

  string = string === null ? '' : '' + string

  return testRegexp.test(string) ? string.replace(replaceRegexp, unescaper) : string
}

console.log(unescape('Curly, Larry &amp; Moe')) 
console.log(escape('Curly, Larry & Moe')) 