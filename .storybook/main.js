const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

// typescript config issues for storybook
// https://github.com/styleguidist/react-docgen-typescript/issues/356
// https://github.com/storybookjs/storybook/blob/next/addons/docs/react/README.md#typescript-props-with-react-docgen

module.exports = {
  stories: ["../src/**/*.stories.@(tsx)"],
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

    return config;
  },
};
