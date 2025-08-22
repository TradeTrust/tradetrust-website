const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname, "config", "babel.config.js"),
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  resolve: {
    fullySpecified: false,
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
    new webpack.ProvidePlugin({
      os: "os-browserify/browser",
    }),
  ],
};
