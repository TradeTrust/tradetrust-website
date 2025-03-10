const fs = require("fs");

const synpressConfigPath = "./node_modules/@synthetixio/synpress/commands/playwright.js";

let playwright = fs.readFileSync(synpressConfigPath, { encoding: "utf8" });
playwright = playwright.replace(").split(': ')[1];", ").split(': ')[1].replace(/(\\n| )/g, '');");
playwright = playwright.replace(").toLowerCase();", ").toLowerCase().replace(/(\\n| )/g, '');");

fs.writeFileSync(synpressConfigPath, playwright, { encoding: "utf8" });
