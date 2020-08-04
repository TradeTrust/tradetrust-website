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
    app: ["./src/index.js"],
  },
  context: path.resolve(__dirname),
  mode: IS_DEV ? "development" : "production",
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
        // For pure CSS (without CSS modules)
        test: /\.s?css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: function insertAtTop(element) {
                const parent = document.querySelector("head");
                const lastInsertedElement = window._lastElementInsertedByStyleLoader;

                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }

                window._lastElementInsertedByStyleLoader = element;
              },
            },
          },
          "css-loader",
          "sass-loader",
        ],
        include: path.resolve(__dirname, "src/styles"),
      },
      {
        // For CSS modules
        test: /\.s?css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
        include: path.resolve(__dirname, "src/components"),
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV", "NET"]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `${__dirname}/public/static/index.html`,
    }),
    ...(IS_PROD
      ? [
          new CompressionPlugin({ test: /\.(js|css|html|svg)$/ }),
          new BrotliPlugin({ test: /\.(js|css|html|svg)$/ }),
          new CopyWebpackPlugin([
            { from: "public/static/images", to: "static/images" },
            { from: "public/static/demo", to: "static/demo" },
            // { from: "static/style.css", to: "static" }
          ]),
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
  devtool: IS_PROD ? false : "cheap-eval-source-map",

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
      "react-dom": "@hot-loader/react-dom",
    },
  },
  bail: true,
};
