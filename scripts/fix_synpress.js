const fs = require("fs");

const synpressConfigPath = "./node_modules/@synthetixio/synpress/commands/playwright.js";

const playwright = fs.readFileSync(synpressConfigPath, { encoding: "utf8" });
const overwrite = playwright.replace(").split(': ')[1];", ").split(': ')[1].replace(/(\\n| )/g, '');");

fs.writeFileSync(synpressConfigPath, overwrite, { encoding: "utf8" });
