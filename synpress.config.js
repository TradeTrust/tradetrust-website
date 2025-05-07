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
      SynpressDefaultPlugins(on, config);
    },
    baseUrl: "http://localhost:3000",
    screenshotsFolder: "tests/e2e/screenshots",
    videosFolder: "tests/e2e/videos",
    specPattern: "tests/e2e/specs/**/*.{js,jsx,ts,mjs,tsx}",
    supportFile,
  },
});
