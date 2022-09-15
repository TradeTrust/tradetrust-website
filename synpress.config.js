const { defineConfig } = require("cypress");
const fixturesFolder = `tests/e2e/fixtures`;
const supportFile = "tests/e2e/support.js";
const setupNodeEvents = require("@synthetixio/synpress/plugins/index");

module.exports = defineConfig({
  userAgent: "synpress",
  retries: {
    runMode: 7,
    openMode: 0,
  },
  fixturesFolder,
  screenshotsFolder: "tests/e2e/screenshots",
  videosFolder: "tests/e2e/videos",
  chromeWebSecurity: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    coverage: false,
  },
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  e2e: {
    setupNodeEvents,
    baseUrl: "http://localhost:3000",
    specPattern: "tests/e2e/specs/**/*.{js,jsx,ts,tsx}",
    supportFile,
  },
  component: {
    componentFolder: ".",
    specPattern: "./**/*spec.{js,jsx,ts,tsx}",
    supportFile,
  },
  screenshotOnRunFailure: false,
  video: false,
});
