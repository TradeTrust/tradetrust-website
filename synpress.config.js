const { defineConfig } = require("cypress");
const pluginsPath = "@synthetixio/synpress/plugins/index";
const supportFile = "tests/e2e/support.js";
const setupNodeEvents = require(pluginsPath);

module.exports = defineConfig({
  userAgent: "synpress",
  retries: {
    runMode: 2,
    openMode: 0,
  },
  fixturesFolder: "tests/e2e/fixtures",
  chromeWebSecurity: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    coverage: false,
  },
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    setupNodeEvents,
    baseUrl: "http://localhost:3000",
    specPattern: "tests/e2e/specs/**/*.{js,jsx,ts,tsx}",
    supportFile,
  },
  component: {
    setupNodeEvents,
    specPattern: "./**/*spec.{js,jsx,ts,tsx}",
    supportFile,
  },
});
