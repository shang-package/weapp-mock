const getUserConfig = require("umi-core/lib/getUserConfig");
const getPaths = require("umi-core/lib/getPaths");

function createMockMiddleware(projectDir) {
  const cwd = projectDir;

  const config = getUserConfig.default({ cwd });
  const paths = getPaths.default({ cwd, config });

  const middleware = require("umi-mock").createMiddleware({
    cwd,
    config,
    absPagesPath: paths.absPagesPath,
    absSrcPath: paths.absSrcPath,
    watch: false,
    onError(e) {
      console.log(e.message);
    },
  }).middleware;

  return [middleware];
}

module.exports = createMockMiddleware;
