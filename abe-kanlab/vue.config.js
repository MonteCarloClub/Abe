module.exports = (options = {}) => ({
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8081,
    proxy: {
      '/api/': {
        target: 'http://10.223.142.244:8080',
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
