const { register } = require("esbuild-register/dist/node");
register();

const { resolve } = require("path");

const projectDir = process.cwd();

console.log({ projectDir });

const v = require(resolve(projectDir, "./src/utils/serviceSwitching.js"));

const port = v.baseUrl.split(":").pop();

if (!port || !/^\d+$/.test(port)) {
  throw new Error("proxy port error " + v.baseUrl);
}

const createMockMiddleware = require("./src/mock-middleware");
const createOriginMiddleware = require("./src/origin-middleware");

const { app, listen } = require("./src/app");

const mw = createMockMiddleware(projectDir);
const mw2 = createOriginMiddleware(v.originBaseUrl);
app.use(...mw);
app.use(...mw2);
listen(port);
