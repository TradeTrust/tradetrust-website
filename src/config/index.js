const NETWORK = process.env.NET || "ropsten";
const IS_MAINNET = NETWORK === "mainnet";
const NETWORK_NAME = IS_MAINNET ? "homestead" : NETWORK;
const IS_DEVELOPMENT = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

module.exports = {
  NETWORK,
  IS_MAINNET,
  NETWORK_NAME,
  IS_DEVELOPMENT,
  INFURA_PROJECT_ID: "1f1ff2b3fca04f8d99f67d465c59e4ef",
  INFURA_API_KEY: process.env.INFURA_API_KEY || "bb46da3f80e040e8ab73c0a9ff365d18",
  NETWORK_ID: IS_MAINNET ? "1" : "3",
  ETHERSCAN_BASE_URL: `https://${IS_MAINNET ? "" : NETWORK_NAME + "."}etherscan.io/`,
  MAGIC_API_KEY: process.env.MAGIC_API_KEY || "pk_test_AB1F885AF848182E",
  GA_MEASUREMENT_ID: "G-13GYPPVD4Y",
  GA_CONFIG_OPTION: {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    debug_mode: IS_DEVELOPMENT,
  },
};
