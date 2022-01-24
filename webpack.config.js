const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Mode = require("frontmatter-markdown-loader/mode");
const { IS_DEVELOPMENT, GA_MEASUREMENT_ID, GA_CONFIG_OPTION, MAGIC_API_KEY } = require("./src/config");

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
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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
      NODE_ENV: "development",
      NET: "ropsten",
      INFURA_API_KEY: "bb46da3f80e040e8ab73c0a9ff365d18",
      ETHEREUM_PROVIDER: "notcloudflare", // temporary fix that wont be needed after oa-verify > 6
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `${__dirname}/public/static/index.html`,
      GA_MEASUREMENT_ID,
      GA_CONFIG_OPTION,
    }),
    ...(!IS_DEVELOPMENT
      ? [
          new CompressionPlugin({ test: /\.(js|css|html|svg)$/ }),
          new BrotliPlugin({ test: /\.(js|css|html|svg)$/ }),
          new CopyWebpackPlugin({
            patterns: [
              { from: "public/static/images", to: "static/images" },
              { from: "public/static/demo", to: "static/demo" },
              { from: "public/static/uploads", to: "static/uploads" },
              { from: "public/admin", to: "admin" },
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
  devtool: !IS_DEVELOPMENT ? false : "eval-cheap-source-map",

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
