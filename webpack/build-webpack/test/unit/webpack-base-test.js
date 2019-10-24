const  assert = require("assert")


describe("webpack.base.js test case", () => {
  const baseConfig = require('../../lib/webpack.base.js')

  it("entry", () => {
    // F:/locRepo/Go-ahead_FE/webpack/build-webpack/test/smoke/template/src/index/index.js
    console.log(baseConfig.entry.index)
    // assert.equal(baseConfig.entry.index, )
  })
})