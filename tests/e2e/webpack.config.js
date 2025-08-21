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
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "../../node_modules/@digitalbazaar"),
          path.resolve(__dirname, "../../node_modules/@trustvc"),
          path.resolve(__dirname, "../../node_modules/@mattrglobal"),
          path.resolve(__dirname, "../../node_modules/base64url-universal"),
          path.resolve(__dirname, "../../node_modules/base58-universal"),
        ],
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
    alias: {
      "@digitalbazaar/bls12-381-multikey": path.resolve(__dirname, "../../node_modules/@digitalbazaar/bls12-381-multikey/lib/index.js"),
      "@digitalbazaar/ecdsa-multikey": path.resolve(__dirname, "../../node_modules/@digitalbazaar/ecdsa-multikey/lib/index.js"),
      "@digitalbazaar/data-integrity": path.resolve(__dirname, "../../node_modules/@digitalbazaar/data-integrity/lib/index.js"),
      "@digitalbazaar/ecdsa-sd-2023-cryptosuite": path.resolve(__dirname, "../../node_modules/@digitalbazaar/ecdsa-sd-2023-cryptosuite/lib/index.js"),
      "@digitalbazaar/di-sd-primitives": path.resolve(__dirname, "../../node_modules/@digitalbazaar/di-sd-primitives/lib/index.js"),
      "@digitalbazaar/bbs-signatures": path.resolve(__dirname, "../../node_modules/@digitalbazaar/bbs-signatures/lib/index.js"),
      "base64url-universal": path.resolve(__dirname, "../../node_modules/base64url-universal/lib/index.js"),
      "base58-universal": path.resolve(__dirname, "../../node_modules/base58-universal/lib/index.js"),
    },
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
