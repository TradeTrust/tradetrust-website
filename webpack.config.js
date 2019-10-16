const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const IS_DEV = process.env.NODE_ENV === "development";
const IS_PROD = !IS_DEV;

module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  context: path.resolve(__dirname),
  mode: IS_DEV ? "development" : "production",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:7].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
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
        include: path.resolve(__dirname, "src")
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV", "NET"]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `${__dirname}/static/index.html`
    }),
    ...(IS_PROD
      ? [
          new CompressionPlugin({ test: /\.(js|css|html|svg)$/ }),
          new BrotliPlugin({ test: /\.(js|css|html|svg)$/ }),
          new CopyWebpackPlugin([
            { from: "static/images", to: "static/images" },
            { from: "static/style.css", to: "static" }
          ])
        ]
      : [])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /\/node_modules\//,
          filename: "vendor.[hash:7].js",
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },

  // Using cheap-eval-source-map for build times
  // switch to inline-source-map if detailed debugging needed
  devtool: IS_PROD ? false : "cheap-eval-source-map",

  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    // host: "127.0.0.1",
    hot: true,
    inline: true,
    port: 3000,
    stats: {
      colors: true,
      progress: true
    }
  },

  resolve: {
    extensions: [".js"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  bail: true
};
