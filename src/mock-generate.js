const os = require("os");
const { writeFileSync, ensureDirSync } = require("fs-extra");
const { resolve } = require("path");
const { execSync } = require("child_process");

function generate(projectDir) {
  const dir = resolve(os.tmpdir(), encodeURIComponent(projectDir));
  ensureDirSync(dir);

  const openApi = require(resolve(projectDir, "openapi.config.js"));
  const data = openApi.map(({ mock, ...v }) => {
    return v;
  });

  writeFileSync(
    resolve(dir, "openapi.config.js"),
    `module.exports = ${JSON.stringify(data, null, 2)}`
  );

  execSync(`cd ${dir} && hto2t openapi.config.js`);

  return dir;
}

module.exports = generate;
