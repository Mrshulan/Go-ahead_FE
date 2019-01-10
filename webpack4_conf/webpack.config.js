const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const BROWSERSLIST = require('./postcss-browserslist')

// hash一般用于filename chunkhash一般用于chunk contenthash一般用于提取css的时候结合ExtractTextWebpackPlugin
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map', // 生产模式一定要关闭，影响速度
  // devServer: {
  //   port: '3000',
  //   hot: true,
  //   open: false,
  //   compress: false,
  //   noInfo: true,
  //   inline: true,
  //   stats: {
  //     colors: true,
  //     chunks: false
  //   }
    // historyApiFallback: {
    //   index: '/views/index.html'
    // },
    // proxy:{
    //   '/mockApi': 'https://easy-mock.com/project/5a0aad39eace86040263d' ,//请求可直接写成  /mockApi/api/login...
    // }
  // },
  entry: {
    index: './src/app.js', // 无论是单页还是多页,entry{}配置入口， 输出配合[name]
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 文件最终输出路径
    filename: 'js/[name].js', // name代表的就是上边的键名 
    chunkFilename: 'js/[name].[chunkhash:8].js', // chunk块 会自动拆分模块，实现按需加载
    // publicPath: '/_static_/' // 文件输出的公共路径
  },
  /* 
  * plugins[] 用于优化
  * 当loader下班了 要对loader干的事情进行
  * 优化分类、提取精华(公共代码提取)、做压缩处理(js/css/html压缩)、输出指定的目录等
  */
  plugins: [
    new CleanWebpackPlugin("./dist"),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.BannerPlugin('给文件添加一些信息，打包日期：'+ new Date()),
    new HtmlWebpackPlugin({
      title: '自定义标题', // 会附带在这个插件生成的（注意是小驼峰命名的变量）htmlWebpackPlugin.options.title上面
      filename: path.resolve(__dirname, './dist/index.html'),
      template: path.resolve(__dirname, './src/view/template.html'),
      minify: {
        removeCommments: true, // 移除注释
        // collapseWhitespace: true, // 压缩空白符和换行符
      },
      // inlineSource: '.(js|css)' // 插入都html的css js文件都需要内联，既不是link script的形式引入 需要安装 html-webpack-inline-source-plugin
      inject: true, // 是否注入内容到输出页面body去 肯定是要链接哇
      // chunks: ['index'], // 指定插入某些模块 runtimeChunk这个就....
      hash: true, // 每次插入文件之后加上hash 用于处理缓存
    }),
    /* 
    * extract-text-webpack-plugin 它对css的提取，
    * 最终是根据你创建的实例、或者配置多个入口 chunk来的,
    * 一个入口文件对应一整个合成的css, 所以这根实例有关， 对重复css不能提取
    */
    // new ExtractTextPlugin({
    //   filename: 'css/[name].css',
    //   disable: false,
    //   allChunks: true,
    // })
    /* 
    * mini-css-extract-plugin
    * 会对你的样式进行模块化拆分,有点跟output里的配置一个意思
    * 异步按需加载，不再仅仅是js的特权
    */
    new MiniCssExtractPlugin({
      filename:'css/[name].css',
      chunkFilename: 'css/[id][chunkhash:8].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'), // css优化压缩 cssProcessor后面可以跟一个process方法，会返回一个promise对象
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
        //autoprefixer: { browsers: CSS_BROWSERS }, 也是可以指定前缀的
      },
      canPrint: true
    }),
    // new BundleAnalyzerPlugin(),
    // 一定写在HtmlWebPackPlugin插件 且要最新的@next
    new PreloadWebpackPlugin({
      rel: 'prefetch', // 自动在预加载的资源上添加 rel="preload"标签即可
      as: 'script', // script、font、image、style、video等等，更多详细请查看API，它还可以返回function
       // as(entry) {
        //   if (/\.css$/.test(entry)) return 'style';
        //   return 'script';
        // },
      include: 'asyncChunks', // 预加载文件 allChunks、initial、asyncChunks、数组等选项，数组即表示指定插入某些文件
      fileBlacklist: [/\index.css|index.js|vendors.js/, /\.whatever/], // 黑名单
    })
  ],
  /* 
  * 编译规则 用于解析文件(每一个文件)
  * 一线生产流水线上的工作者
  */
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
              // 后 逆序
              presets: ['env', 'react', 'es2015', 'stage-0'],
              // 先 正序
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // 这是为配合css里边的url
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: BROWSERSLIST
                })
              ],
              sourceMap: true
            }
          },
          'sass-loader'
        ]
        // use: ExtractTextPlugin.extract({
        //   // fallback: 'style-loader', // 没用 因为最后拆分后的都是link形式引入， 热更新只会跟新style标签的
        //   use: [
        //     'css-loader',
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         plugins: [
        //           require('autoprefixer')({
        //             browsers: BROWSERSLIST
        //           })
        //         ],
        //         sourceMap: true,
        //         minimize: false,
        //       }
        //     },
        //     'sass-loader'
        //   ]
        // })


        // use: [
        //   'style-loader',
        //   'css-loader',
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       // 还有presets、plugins等属性
        //       plugin: [require('autoprefixer')({
        //         browsers: BROWSERSLIST
        //       })],
        //       sourceMap: true
        //     }
        //   },
        //   'sass-loader'
        // ]
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
      },
      {
        test: /\.(html|htm)$/,
        exclude: path.resolve(__dirname, './src/view'),
        use: [
          {
            loader: 'html-loader',
            options: {
              publicPath: './',
              attrs: ['img:src']
            } // 在output里边的设置的publicPath会依据那个
          }
        ]
      }
    ]
  },
  /* 
  * webpack4新增的optimization
  */
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
    },
    // 也可以直接设置 boolean
    minimizer: [
      new UglifyJsPlugin({
        cache: true, // 字符串即是缓存路径
        parallel: true,  // 启用多线程并行运行来提高编译速度
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false, // 删除所有注释
          },
          compress: {
            warning: false, // 进行删除一些无用代码的时候，不提示警告，
            drop_console: true, // 过滤掉console
          }
        }
      })
    ]
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