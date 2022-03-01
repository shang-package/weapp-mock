const express = require("express");

const app = express();

function listen(port) {
  app.listen(port);
  const u = `http://127.0.0.1:${port}`;
  console.log(u);
}

module.exports = { listen, app };
