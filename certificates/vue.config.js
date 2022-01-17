module.exports = (options = {}) => ({
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8081,
    disableHostCheck: true,   // That solved it
    proxy: {
      '/cert/': {
        target: 'https://dpki.hifool.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/cert': ''
        }
      }
    },
  },
})
