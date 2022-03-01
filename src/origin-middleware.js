const { createProxyMiddleware } = require("http-proxy-middleware");

function f(u) {
  return [
    createProxyMiddleware({
      logLevel: "debug",
      target: u,
      changeOrigin: true,
    }),
  ];
}

module.exports = f;
