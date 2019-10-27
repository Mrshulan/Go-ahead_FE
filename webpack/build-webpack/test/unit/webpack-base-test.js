const  assert = require("assert")

describe("webpack.base.js test case", () => {
  const baseConfig = require('../../lib/webpack.base.js')

  it("entry", () => {
    assert.equal(baseConfig.entry.index, "F:/locRepo/Go-ahead_FE/webpack/build-webpack/test/smoke/template/src/index/index.js")
    assert.equal(baseConfig.entry.search, "F:/locRepo/Go-ahead_FE/webpack/build-webpack/test/smoke/template/src/search/index.js")
  })
})