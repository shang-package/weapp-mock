const os = require("os");
const { ensureDirSync, emptyDirSync } = require("fs-extra");
const { resolve } = require("path");

const { generate: g } = require("@s4p/o2t");

async function generate(projectDir) {
  const dir = resolve(os.tmpdir(), encodeURIComponent(projectDir));
  ensureDirSync(dir);
  emptyDirSync(resolve(dir, "mock"));

  const openApi = require(resolve(projectDir, "openapi.config.js"));

  openApi.forEach((item) => {
    item.mock = true;
  });

  await g(resolve(dir, "mock"), openApi);

  return dir;
}

module.exports = generate;
