module.exports = (options = {}) => ({
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8081,
    proxy: {
      '/api/': {
        target: 'http://192.168.137.137:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
})
