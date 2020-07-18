// 定义一个空数组，将开发环境的插件包丢入进去
const proPluguns = []
// 获取当前的打包环境是否为生产环境
if (process.env.NODE_ENV === 'production') {
  proPluguns.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      } 
    ],
    ...proPluguns
  ]
}
