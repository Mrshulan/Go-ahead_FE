const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const BROWSERSLIST = require('./postcss-browserslist')

// hash一般用于filename chunkhash一般用于chunk contenthash一般用于提取css的时候结合ExtractTextWebpackPlugin
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map', // 生产模式一定要关闭，影响速度
  entry: {
    index: './src/app.js', // 无论是单页还是多页,entry{}配置入口， 输出配合[name]
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 文件最终输出路径
    filename: 'js/[name].js', // name代表的就是上边的键名 
    chunkFilename: 'js/[name].[chunkhash:8].js', // chunk块 会自动拆分模块，实现按需加载
    publicPath: '/_static_/' // 文件输出的公共路径
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin("./dist"),
  ],
  // 编译规则
  module: {
    // 规则
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'es2015', 'stage-0'],
              plugins: []
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              // 还有presets、plugins等属性
              plugin: [require('autoprefixer')({
                browsers: BROWSERSLIST
              })],
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'url-loader?limit=12&name=images/[name].[hash:8].[ext]'
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async', // 共有三个值可以选: initial(初始模块)、async(按需加载模块)、all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      // maxSize: 0,
      minChunks: 1,  // 模块被引用>=1次，便分割
      maxAsyncRequests: 1, // 异步加载chunk的并发请求数 <=
      maxInitialRequests: 1, // 一个入口并发加载的chunk数量 <=
      automaticNameDelimiter: '~',
      name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true
      //   }
      // }
    },
    runtimeChunk: { // 会覆盖 入口指定的名称！！！
      // name: 'manifest', //固定 
      name: entrypoint => `runtimechunk~${entrypoint.name}` // 开启的默认值处理
    }
  },
  // 配置模块如何解析
  resolve: {
    extensions: ['.js', '.jsx', '.scss',  '.css', '.json'], // 省去扩展名的引入
    alias: {
      src: './src', // 给某些经常使用的路径设置别名,
      dist: './dist',
    },
    // modules: ['node_modules'], // webpack解析模块时候应该搜索的路径
  }
}