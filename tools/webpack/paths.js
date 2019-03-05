const { resolve } = require("path");
const { currentDirectory } = require("../../envs");

//= =============================================================================//
// PATHS FOR WEBPACK DEVELOPMENT & PRODUCTION CONFIGS                            /
//= =============================================================================//

module.exports = {
  currentDirectory: resolve(`${currentDirectory}`), // current working directory
  publicAssets: resolve(`${currentDirectory}/public/assets`), // public assets directory
  loadableAssets: "public/loadable-assets.json", // loadable assets manifest
  srcDirectory: resolve(`${currentDirectory}/src`), // project source directory
  webpackAssets: resolve(`${currentDirectory}/public/webpack-assets.json`) // webpack assets manifest
};
