module.exports = {
  chainWebpack: (config) => {
    /* 添加分析工具 */
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')  
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
      config.plugins.delete('prefetch')
    } else {

    }
  },
  /**瘦身开始 */
  outputDir: 'dist', // 在npm run build时 生成文件的目录 type:string, default:'dist'
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  /**gih  */
  configureWebpack: cfg => {
    const htmlPlugin = cfg.plugins.find(v => v.constructor.name === 'HtmlWebpackPlugin')
    htmlPlugin.options.isProd = global.process.env.NODE_ENV === 'production'
    htmlPlugin.options.title = (htmlPlugin.options.isProd ? '' : 'dev-') + '新佳宜数据模拟系统'

    const myCfg = {
      entry: {
        app: './src/main.js',
      },
    }

    // 生产环境
    if (global.process.env.NODE_ENV === 'production') {
      myCfg.entry.app = './src/main.js'
      // key    是 第三方包名
      // value  是 该第三方包CND全局变量名
      myCfg.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        vuex:'vuex',
        lodash: '_',
        echarts: 'echarts',
        moment: 'moment',
        xlsx:'xlsx'
      }
    }

    return myCfg
  },
}

