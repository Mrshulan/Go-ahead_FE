const JSZIP = require("jszip")
const path = require('path')
const RawSource = require('webpack-sources').RawSource
const zip = new JSZIP()

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
      const folder = zip.folder(this.options.filename)

      for(let filename in compilation.assets) {
        const source = compilation.assets[filename].source()
        folder.file(filename, source)
      }


      zip.generateAsync({
        type: 'nodebuffer'
      }).then((content) => {
        const outputPath = path.join(
          compilation.options.output.path,
          this.options.filename + '.zip'
        )
        const outputRelativePath = path.relative(
          compilation.options.output.path,
          outputPath
        )

        console.log("outputPath", outputPath)
        console.log("outputRelativePath", outputRelativePath)

        compilation.assets[outputRelativePath] =  new RawSource(content)

        callback()
      })
    })
  }
}