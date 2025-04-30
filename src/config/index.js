const IS_DEVELOPMENT = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

const NETWORK = process.env.NET ? process.env.NET : IS_DEVELOPMENT ? "sepolia" : "mainnet";
const IS_MAINNET = NETWORK === "mainnet";
const NETWORK_NAME = IS_MAINNET ? "homestead" : NETWORK;
const ETHERSCAN_SUBDOMAIN = IS_MAINNET ? "" : `${NETWORK_NAME}.`;
const GA_MEASUREMENT_ID_DEVELOPMENT = "G-13GYPPVD4Y";
const GA_MEASUREMENT_ID_PRODUCTION = "G-7YL3CX08LM";
const GA_MEASUREMENT_ID = IS_MAINNET ? GA_MEASUREMENT_ID_PRODUCTION : GA_MEASUREMENT_ID_DEVELOPMENT;

module.exports = {
  ETHERSCAN_BASE_URL: `https://${ETHERSCAN_SUBDOMAIN}etherscan.io/`,
  GA_MEASUREMENT_ID,
  GA_CONFIG_OPTION: {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    debug_mode: IS_DEVELOPMENT,
  },
  STABILITY_API_KEY: process.env.STABILITY_API_KEY || "",
  STABILITY_TESTNET_API_KEY: process.env.STABILITY_TESTNET_API_KEY || "",
  ASTRON_TESTNET_API_KEY: process.env.ASTRON_TESTNET_API_KEY || "",
  INFURA_API_KEY: process.env.INFURA_API_KEY,
  ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  IS_DEVELOPMENT,
  IS_MAINNET,
  MAGIC_API_KEY: process.env.MAGIC_API_KEY || process.env.MAGIC_API_KEY_FALLBACK, // dlt gmail fallback
  NETWORK,
  NETWORK_NAME,
  NETWORK_ID: IS_MAINNET ? "1" : "11155111",
  IS_TEST_ENV: process.env.NODE_ENV === "test",
  IS_DEV_SERVER: !!process.env.WEBPACK_DEV_SERVER,
};
