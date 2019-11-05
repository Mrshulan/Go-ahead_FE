const loaderUtils = require('loader-utils')

module.exports = function (source) {
  console.log('Loader A is excuted!')

  const url = loaderUtils.interpolateName(this, '[name].[ext]', source)

  console.log(url)

  this.emitFile(url, source)

  return source
}