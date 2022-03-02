/**
 * require ts / esm
 */
const { register } = require("esbuild-register/dist/node");
register();

const projectDir = process.cwd();

const { resolve } = require("path");
const { default: chalk } = require("chalk");

console.log({ projectDir });

const v = require(resolve(projectDir, "./src/utils/serviceSwitching.js"));

const port = v.baseUrl.split(":").pop();

if (!port || !/^\d+$/.test(port)) {
  throw new Error("proxy port error " + v.baseUrl);
}

const mockDataGenerate = require("./src/mock-generate");
const createMockMiddleware = require("./src/mock-middleware");
const createOriginMiddleware = require("./src/origin-middleware");

const { app, listen } = require("./src/app");

console.log(chalk.blue(`正在生成 mock 数据中...`));
const dir = mockDataGenerate(projectDir);
console.log(chalk.blue(`mock 数据路径: ${dir}`));

const mw = createMockMiddleware(dir);
const mw2 = createOriginMiddleware(v.originBaseUrl);
app.use(...mw);
app.use(...mw2);
const u = listen(port);
console.log("\n\n\n");
console.log(chalk.blue(u));
