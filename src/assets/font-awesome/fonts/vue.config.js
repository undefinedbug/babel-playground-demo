module.exports = {
  chainWebpack: config => {
    console.table(config.module)
    config.module
      .rule('font')
      .test(/\.(eot|svg|ttf|woff|woff2|otf))$/)
      .use('url-loader')
      .loader('url-loader')
      .end()
  },
}
