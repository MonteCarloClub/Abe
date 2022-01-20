module.exports = (options = {}) => ({
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8081,
    disableHostCheck: true,   // That solved it
    proxy: {
      '/api/': {
        target: 'http://47.103.212.175:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
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
