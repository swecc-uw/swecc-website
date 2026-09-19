const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/google-calendar.ics",
    createProxyMiddleware({
      target: "https://calendar.google.com",
      changeOrigin: true,
      pathRewrite: () =>
        "/calendar/ical/swecc%40uw.edu/public/basic.ics",
    }),
  );
};
