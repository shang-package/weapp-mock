const { register } = require("esbuild-register/dist/node");
register();

const { parentPort, workerData } = require("worker_threads");

const { configPath } = workerData;

let v;

try {
  v = require(configPath);

  parentPort.postMessage(v);
} catch (e) {
  throw new Error(`config parse failed: ${configPath}`);
}
