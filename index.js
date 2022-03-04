const { register } = require("esbuild-register/dist/node");
register();

const { Worker } = require("worker_threads");
const { resolve } = require("path");
const chalk = require("chalk");

const mockDataGenerate = require("./src/mock-generate");
const createMockMiddleware = require("./src/mock-middleware");
const createOriginMiddleware = require("./src/origin-middleware");

const { app, listen } = require("./src/app");

const projectDir = process.cwd();

console.log(chalk.greenBright(`项目目录 ${projectDir}`));

const configPath = resolve(projectDir, "./src/config");

async function getConfig() {
  return new Promise((rs, rj) => {
    setTimeout(rj, 1000);

    const worker = new Worker(resolve(__dirname, "./src/worker-require.js"), {
      workerData: { configPath },
      stdout: true,
    });

    worker.on("message", rs);
  });
}

(async () => {
  const v = await getConfig();

  const port = v.baseUrl.split(":").pop();

  if (!port || !/^\d+$/.test(port)) {
    throw new Error("proxy PORT error " + v.baseUrl);
  }

  console.log(chalk.blue(`正在生成 mock 数据中...`));
  const dir = await mockDataGenerate(projectDir);
  console.log(chalk.blue(`mock 数据路径: ${dir}`));

  const mw = createMockMiddleware(dir);
  const mw2 = createOriginMiddleware(v.originBaseUrl);
  app.use(...mw);
  app.use(...mw2);
  const u = listen(port);
  console.log("\n");
  console.log(`代理地址: ${chalk.greenBright(u)}`);
  console.log("\n");
})().catch(console.warn);
