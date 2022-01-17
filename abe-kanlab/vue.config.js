module.exports = (options = {}) => ({
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8081,
    disableHostCheck: true,   // That solved it
    proxy: {
      '/api/': {
        target: 'http://58.247.201.96:8080',
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
