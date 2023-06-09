const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const cdnDependencies = require('./dependencies-cdn')
const jsonImporter = require('node-sass-json-importer')

const isProduction = process.env.NODE_ENV === 'production'
const url = process.env.DEV_NEED_IP

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 设置不参与构建的库
const externals = {}
cdnDependencies[0].forEach(pkg => { externals[pkg.name] = pkg.library })

// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies[0].map(e => e.css).filter(e => e),
  js: cdnDependencies[0].map(e => e.js).filter(e => e),
  ext: cdnDependencies[1].map(e => e.js).filter(e => e)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  css: {
    loaderOptions: {
      // 定义全局scss无需引入即可使用
      sass: {
        prependData: ``,
        sassOptions: {
          importer: jsonImporter({
            resolver: function (dir, url) {
              return url.startsWith('~/')
                ? require('path').resolve(dir, '../../../../public/data/theme', url.substr(2))
                : require('path').resolve(dir, url)
            }
          })
        }
      }
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction) {
      config.externals = externals

      // gzip压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      )

      // 代码压缩
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info'] // 移除console
            }
          }
        })
      )

      // 直接打包成zip压缩文件
      config.plugins.push(
        new FileManagerPlugin({
          onEnd: {
            // 首先需要删除项目根目录下的dist.zip
            delete: [
              './dist.zip'
            ],
            // 然后我们选择dist文件夹将之打包成dist.zip并放在根目录
            archive: [
              {source: './dist', destination: './dist.zip'}
            ]
          }
        })
      )
    }
  },
  // webpack配置
  chainWebpack: config => {
    // 压缩响应的app.json返回的代码压缩: TODO 感觉未成功
    config.optimization.minimize(!!isProduction)
    // 添加 CDN 参数到 htmlWebpackPlugin 配置中
    config.plugin('html').tap(args => {
      args[0].css = cdn.css
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction) args[0].js = cdn.js
      // 非生产环境时保证程序运行时用
      if (!isProduction) args[0].ext = cdn.ext
      return args
    })
    // 删除懒加载模块的 prefetch preload，降低带宽压力
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效
    config.resolve.symlinks(true)
    // 重新设置 alias
    config.resolve.alias
      .set('$@', resolve('node_modules/@p8/plat/src'))
      .end()
    if (isProduction) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  devServer: {
    open: true, // 配置自动启动浏览器
    host: '127.0.0.1',
    port: 8084,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    proxy: {
      '/api': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
