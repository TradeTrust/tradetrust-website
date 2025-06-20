const log = require("debug")("synpress:config");
const { defineConfig } = require("cypress");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const SynpressDefaultPlugins = require("@synthetixio/synpress/plugins/index");
const path = require("path");
const fs = require("fs");

const fixturesFolder = `./tests/e2e/fixtures`;
const supportFile = "tests/e2e/support/index.mjs";
const downloadFolder = "./tests/e2e/downloads";

module.exports = defineConfig({
  userAgent: "synpress",
  retries: 1,
  fixturesFolder,
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    testIsolation: false,
    setupNodeEvents: function (on, config) {
      const options = {
        webpackOptions: require("./tests/e2e/webpack.config"),
      };

      on("file:preprocessor", webpackPreprocessor(options));

      on("task", {
        clearDownloads({ tempDirectory }) {
          // Remove downloads folder
          const downloadsPath = path.join(__dirname, downloadFolder);
          if (fs.existsSync(downloadsPath)) {
            fs.rmSync(downloadsPath, { recursive: true, force: true });
          }

          // Clear playwright artifacts from temp directory
          if (fs.existsSync(tempDirectory)) {
            const items = fs.readdirSync(tempDirectory, { withFileTypes: true });
            for (const item of items) {
              if (item.isDirectory() && item.name.startsWith("playwright-artifacts-")) {
                const fullPath = path.join(tempDirectory, item.name);
                fs.rmSync(fullPath, { recursive: true, force: true });
              }
            }
          }
          return null;
        },
        getFilePath({ tempDirectory, fileName }) {
          if (!fs.existsSync(tempDirectory)) {
            return null;
          }
          // Find playwright artifacts folder and copy file to downloads folder
          const entries = fs.readdirSync(tempDirectory, { withFileTypes: true });
          const match = entries.find((entry) => entry.isDirectory() && entry.name.startsWith("playwright-artifacts-"));

          if (!match) {
            return null;
          }
          const fullPath = path.join(tempDirectory, match.name);
          const files = fs.readdirSync(fullPath).map((file) => path.join(fullPath, file));
          const destinationPath = path.join(__dirname, downloadFolder, fileName);
          const destinationDir = path.join(__dirname, downloadFolder);

          if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
          }

          fs.copyFileSync(files[0], destinationPath);
          return destinationPath;
        },
      });
      SynpressDefaultPlugins(on, config);
    },
    baseUrl: "http://localhost:3000",
    screenshotsFolder: "tests/e2e/screenshots",
    videosFolder: "tests/e2e/videos",
    specPattern: "tests/e2e/specs/**/*.{js,jsx,ts,mjs,tsx}",
    supportFile,
  },
  blockHosts: ["*launchdarkly.com", "*google-analytics.com", "*auth.magic.link"],
});
