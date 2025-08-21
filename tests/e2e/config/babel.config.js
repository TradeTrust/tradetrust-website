let config = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
        modules: "commonjs",
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
  sourceType: "unambiguous",
};

module.exports = config;
