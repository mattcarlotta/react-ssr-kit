const fs = require("fs-extra");
const commandExists = require("command-exists");
const { execSync } = require("child_process");

const serverDir = "./src/server.js";
const packageJSONDir = "./package.json";

const displayError = err => console.log(`--[ERROR]-- \n ${err.toString()}`);

const execute = command => execSync(command, { stdio: "ignore" });

const readFromFile = path => fs.readFile(path, "utf8");

const removeLinesFromFile = (data, lines = []) =>
  data
    .split("\n")
    .filter((_, idx) => !lines.includes(idx))
    .join("\n");

const writeToFile = (path, file, lines = []) =>
  fs.writeFile(path, removeLinesFromFile(file, lines), "utf8");

const runCommand = (main, alt, options = "") =>
  new Promise((resolve, reject) => {
    try {
      execute(
        commandExists("yarn")
          ? `yarn ${main} ${options}`
          : `npm ${alt || main} ${options}`
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });

(async () => {
  try {
    await fs.removeSync("./api");
    const serverFile = await readFromFile(serverDir);
    await writeToFile(serverDir, serverFile, [6, 16, 17]);
    await runCommand(
      "remove",
      "uninstall -S",
      "bluebird body-parser command-exists consign fs-extra mongoose"
    );
    const packageJSONFile = await readFromFile(packageJSONDir);
    await writeToFile(packageJSONDir, packageJSONFile, [25]);
    await runCommand("install");
    await fs.removeSync("./removeAPI.js");
  } catch (err) {
    displayError(err);
  } finally {
    process.exit(0);
  }
})();
