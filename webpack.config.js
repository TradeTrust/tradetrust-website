const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Mode = require("frontmatter-markdown-loader/mode");
const { IS_DEVELOPMENT, IS_TEST_ENV, IS_DEV_SERVER, GA_MEASUREMENT_ID, GA_CONFIG_OPTION } = require("./src/config");

module.exports = {
  entry: {
    app: ["./src/index.tsx"],
  },
  context: path.resolve(__dirname),
  mode: IS_DEVELOPMENT ? "development" : "production",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:7].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules/web-did-resolver")],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { url: false } },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        options: {
          mode: [Mode.BODY],
        },
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      // need to define variables here, so later can be overwritten at netlify env var end
      // TODO: use dotenv instead
      NODE_ENV: "development",
      NET: "sepolia",
      INFURA_API_KEY: "bb46da3f80e040e8ab73c0a9ff365d18",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `${__dirname}/public/static/index.html`,
      GA_MEASUREMENT_ID,
      GA_CONFIG_OPTION,
    }),
    ...(!IS_DEV_SERVER
      ? [
          new CompressionPlugin({ test: /\.(js|css|html|svg)$/ }),
          new BrotliPlugin({ test: /\.(js|css|html|svg)$/ }),
          new CopyWebpackPlugin({
            patterns: [
              { from: "public/static/common", to: "static/common" },
              { from: "public/static/images", to: "static/images" },
              { from: "public/static/demo", to: "static/demo" },
              { from: "public/static/uploads", to: "static/uploads" },
              { from: "public/static/robots.txt", to: "robots.txt" },
              { from: "public/imd@", to: "imd@" },
            ],
          }),
        ]
      : []),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /\/node_modules\//,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },

  // Using cheap-eval-source-map for build times
  // switch to inline-source-map if detailed debugging needed
  devtool: !IS_DEVELOPMENT || IS_TEST_ENV ? false : "eval-cheap-source-map",

  devServer: {
    compress: true,
    contentBase: path.join(__dirname, "public"),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000,
    stats: {
      colors: true,
      progress: true,
    },
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      react: path.resolve("./node_modules/react"),
    },
  },
  bail: true,
};
