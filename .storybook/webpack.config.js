const path = require("path");

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.s?css$/,
    loaders: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          localsConvention: "camelCase",
          modules: {
            localIdentName: "[name]__[local]___[hash:base64:5]"
          },
          importLoaders: 1
        }
      },
      "sass-loader"
    ],
    include: path.resolve(__dirname, "../src")
  });

  return config;
};
