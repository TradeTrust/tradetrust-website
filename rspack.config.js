const { rspack } = require("@rspack/core");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const path = require("path");
const Mode = require("frontmatter-markdown-loader/mode");
const { IS_DEVELOPMENT, IS_TEST_ENV, IS_DEV_SERVER, GA_MEASUREMENT_ID, GA_CONFIG_OPTION } = require("./src/config");
const Dotenv = require("dotenv-webpack");
const { defineConfig } = require("@rspack/cli");

module.exports = defineConfig({
  resolve: {
    alias: {
      process: "process/browser",
    },
    fallback: {
      vm: require.resolve("vm-browserify"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      buffer: require.resolve("buffer"),
      "process/browser": require.resolve("process/browser"),
      util: require.resolve("util/"),
      events: require.resolve("events/"),
    },
    extensions: [".js", ".ts", ".tsx"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      react: path.resolve("./node_modules/react"),
    },
  },
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
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "tests")], // Specify the directory where your test files reside
        use: {
          loader: "babel-loader",
        },
      },
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
          { loader: require.resolve("postcss-loader") },
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
    new Dotenv({
      path: ".env",
      safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    }),
    new rspack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new rspack.ProvidePlugin({
      os: "os-browserify/browser",
    }),
    new rspack.ProvidePlugin({
      process: "process/browser",
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
          new rspack.CopyRspackPlugin({
            patterns: [
              { from: "public/static/fonts", to: "static/fonts" },
              { from: "public/static/common", to: "static/common" },
              { from: "public/static/images", to: "static/images" },
              { from: "public/static/creator", to: "static/creator" },
              { from: "public/static/sitemap.xml", to: "sitemap.xml" },
              { from: "public/static/robots.txt", to: "robots.txt" },
            ],
          }),
        ]
      : []),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
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
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    compress: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
  stats: {
    colors: true,
  },
  bail: true,
});
