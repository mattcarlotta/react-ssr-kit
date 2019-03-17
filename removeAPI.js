const fs = require("fs-extra");
const commandExists = require("command-exists");
const { execSync } = require("child_process");

const apiDir = "./api";
const serverDir = "./src/server.js";
const packageJSONDir = "./package.json";
const removeAPIDir = "./removeAPI.js";

const displayError = err => console.log("--[ERROR]-- \n", err.toString());

const execute = command => execSync(command, { stdio: "ignore" });

const updateDependencies = () =>
  new Promise((resolve, reject) => {
    try {
      if (commandExists("yarn")) {
        execute("yarn install");
      } else {
        execute("npm install");
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });

const removeUnusedDependencies = () =>
  new Promise((resolve, reject) => {
    try {
      if (commandExists("yarn")) {
        execute(
          "yarn remove bluebird body-parser fs-extra command-exists consign mongoose"
        );
      } else {
        execute(
          "npm uninstall -S bluebird body-parser fs-extra command-exists consign mongoose"
        );
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });

const removeLines = (data, lines = []) =>
  data
    .split("\n")
    .filter((val, idx) => lines.indexOf(idx) === -1) // eslint-disable-line lodash/prefer-includes
    .join("\n");

(async () => {
  try {
    await fs.removeSync(apiDir);
    const serverFile = await fs.readFile(serverDir, "utf8");
    await fs.writeFile(serverDir, removeLines(serverFile, [6, 16, 17]), "utf8");
    await removeUnusedDependencies();
    const packageJSONFile = await fs.readFile(packageJSONDir, "utf8");
    await fs.writeFile(
      packageJSONDir,
      removeLines(packageJSONFile, [25]),
      "utf8"
    );
    await updateDependencies();
    await fs.removeSync(removeAPIDir);
  } catch (err) {
    displayError(err);
  } finally {
    process.exit(0);
  }
})();
