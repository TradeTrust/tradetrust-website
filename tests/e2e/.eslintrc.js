const path = require("path");
const synpressPath = path.join(process.cwd(), "/node_modules/@synthetixio/synpress");
console.log("");
console.log({ synpressPath });
console.log("");
module.exports = {
  extends: `${synpressPath}/.eslintrc.js`,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
