const webpackPreprocessor = require("@cypress/webpack-preprocessor");
console.log("#### #### ####");
console.log("plugin file for synpress");
console.log("#### #### ####");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require("../../webpack.config"),
        watchOptions: {},
      };

      on("file:preprocessor", webpackPreprocessor(options));
    },
  },
  component: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require("../../webpack.config"),
        watchOptions: {},
      };

      on("file:preprocessor", webpackPreprocessor(options));
    },
  },
});
