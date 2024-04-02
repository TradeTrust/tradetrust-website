const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require("../webpack.config"),
        watchOptions: {},
      };

      on("file:preprocessor", webpackPreprocessor(options));
    },
  },
  component: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require("../webpack.config"),
        watchOptions: {},
      };

      on("file:preprocessor", webpackPreprocessor(options));
    },
  },
});
