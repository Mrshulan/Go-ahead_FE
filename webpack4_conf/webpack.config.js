const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const BROWSERSLIST = require('./postcss-browserslist')

/* 
  工作流程 (加载 - 编译 - 输出)
  1、读取配置文件，按命令 初始化 配置参数(图谱依赖)，创建 全局Compiler 对象；
  2、调用插件的 apply 方法 挂载插件 监听，然后从入口文件开始执行编译；
  3、按文件类型，调用相应的 Loader 对模块进行 编译，并在合适的时机点触发对应的事件，调用 Plugin 执行，最后再根据模块 依赖查找 到所依赖的模块，递归执行第三步；
  4、将编译后的所有代码包装成一个个代码块 (Chuck)， 并按依赖和配置确定 输出内容。这个步骤，仍然可以通过 Plugin 进行文件的修改;
  5、最后，根据 Output 把文件内容一一写入到指定的文件夹中，完成整个过程
*/

/* 
  hash的使用
  hash: 和整个项目的构建相关， 只要项目文件有任意修改，整个项目构建的hash值就会被修改
  chunkhash: 和webpack打包的chunk有关 不同的entry，以及定义的splitchunks 会生成不同的chunkhash值
  contenthash: 根据文件的内容来定义hash, 文件内容不变，则contenthash  适合css文件
*/

/* 
  热更新的理解
  Webpack compile 将js 编译成 Bundle
  HMR server 将热更新的文件输出给HMR Runtime(跟随bundjs注入到Browser监听,达到效果)
  Bundle server 提供文件在浏览器的访问
  HMR Runtime会被注入掉浏览器，更新文件变化(此前都是基于Webpack Dev Server)
*/

/* 
  plugins 基于事件发布订阅模式(事件流)  Compiler(主流程运作，全局一个) Compilation(单独的事件钩子机制)
  用途：优化分类、提取精华(公共代码提取)、做压缩处理(js/css/html压缩)、输出指定的目录等
*/

/* 
  loader (基于node require文件权利比较大) 链式调用(compose顺序 中间字符串结果传递) 可配合 Plugin 发挥更大的作用
*/

module.exports = {
  mode: 'development', // production下默认会启用UglifyJsPlugin
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
    publicPath: './' // 文件输出的公共路径
  },
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
      chunkFilename: 'css/[id].[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
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
      rel: 'preload', // 自动在预的资源上添加 rel="preload" (区别 preload预加载  和 prefecth预读取)
      as: 'script', // 最高优先级 script、font、image、style、video等等,它还可以返回function
       // as(entry) {
        //   if (/\.css$/.test(entry)) return 'style';
        //   return 'script';
        // },
      excludeHtmlNames: ['index.html'],
      include: 'allChunks', // 预加载文件 allChunks、initial、asyncChunks、数组等选项，数组即表示指定插入某些文件
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
              publicPath: '../' // 这是为配合css里边的url (例如/dist/css/images/ ✖)
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
          { // 处理: 正常我们在写的时候都是以当前文件(dist)作为出发点 而当我们访问html时，在css处理里边做出路径调整
            loader: 'url-loader?limit=3000&name=images/[name].[hash:8].[ext]',
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader?name=/assets/fonts/[name].[hash:8].[ext]',
          }
        ]
      },
    ]
  },
  /* 
  * webpack4新增的optimization
  */
  optimization: {
    splitChunks: {
      chunks: 'async',  // 必须三选一： "initial(import)" | "all"(推荐import import()) | "async(import())" (默认就是async)
      minSize: 0, // 模块超过多少k自动被抽离成公共模块
      minChunks: 1,  // 模块被引用>=1次，便分割
      maxAsyncRequests: 5, // 异步(按需)加载chunk的并发请求数 <=
      maxInitialRequests: 3, // 一个入口并发加载的chunk数量 <=
      automaticNameDelimiter: '~',
      name: true, // 默认由模块名~hash命名，名称相同时多个模块将合并为1个，可以设置为function
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          enforce: true, // 使用cacheGroup配置不继承
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 值越大越好
        },
        common: {
          chunks: 'all',
          minChunks: 2,
          priority: -9,
          name: 'common',
          minSize: 0, // 模块超过多少k自动被抽离成公共模块
          reuseExistingChunk: true // 可重用chunk
        }
      }
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