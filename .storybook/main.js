const path = require("path");
const webpack = require("webpack");

// typescript config issues for storybook
// https://github.com/styleguidist/react-docgen-typescript/issues/356
// https://github.com/storybookjs/storybook/blob/next/addons/docs/react/README.md#typescript-props-with-react-docgen

module.exports = {
  stories: ["../src/**/*.stories.@(tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "@storybook/addon-webpack5-compiler-babel",
  ],

  typescript: {
    reactDocgen: "react-docgen", // once react-docgen-typescript v2 in included in storybook, remove this config
  },

  webpackFinal: async (config) => {
    // need to include this web-did-resolver module into babel-loader to convert it from using esm to commonjs
    const directoryPath = path.resolve(__dirname).replace(".storybook", "");

    config.module.rules.push({
      test: /\.(ts|js)x?$/,
      include: [directoryPath, directoryPath.concat("node_modules/web-did-resolver")],
      use: {
        loader: "babel-loader",
      },
    });
    config.resolve.fallback = {
      vm: require.resolve("vm-browserify"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      buffer: require.resolve("buffer"),
      "process/browser": require.resolve("process/browser"),
      util: require.resolve("util/"),
      events: require.resolve("events/"),
    };

    if (!config.plugins) {
      config.plugins = [];
    }

    config.plugins.push(new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }));

    return config;
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  docs: {
    autodocs: true,
  },
};
