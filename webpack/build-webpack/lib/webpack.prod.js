const cssnano = require('cssnano')
const merge = require('webpack-merge')
const HtmlWebpackExternalsPlugin = require('http-webpack-externals-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-plugin')
const baseConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsPlugins({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM'
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        }
      }
    }
  }
}

module.exports = merge(baseConfig, prodConfig)