const log = require("debug")("synpress:config");
const { defineConfig } = require("cypress");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const SynpressDefaultPlugins = require("@synthetixio/synpress/plugins/index");

const fixturesFolder = `./tests/e2e/fixtures`;
const supportFile = "tests/e2e/support/index.mjs";

module.exports = defineConfig({
  userAgent: "synpress",
  retries: 1,
  fixturesFolder,
  e2e: {
    testIsolation: false,
    setupNodeEvents: function (on, config) {
      const options = {
        webpackOptions: require("./tests/e2e/webpack.config"),
      };

      on("file:preprocessor", webpackPreprocessor(options));
      SynpressDefaultPlugins(on, config);
    },
    baseUrl: "http://localhost:3000",
    screenshotsFolder: "tests/e2e/screenshots",
    videosFolder: "tests/e2e/videos",
    specPattern: "tests/e2e/specs/**/*.{js,jsx,ts,mjs,tsx}",
    supportFile,
  },
});
