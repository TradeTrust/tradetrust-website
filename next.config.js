const Mode = require("frontmatter-markdown-loader/mode");

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: {
        mode: [Mode.BODY],
      },
    });

    return config;
  },
};
