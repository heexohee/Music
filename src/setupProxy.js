const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://ec2-15-164-162-180.ap-northeast-2.compute.amazonaws.com:8080',
      changeOrigin: true,
    }),
  );
};