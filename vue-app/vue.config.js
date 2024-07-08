module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    server: {
      type: "https"
    },
    proxy: {
      '/api': {
        target: 'http://localhost:7071',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
