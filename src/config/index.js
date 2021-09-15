export const NETWORK = process.env.NET || "ropsten";

export const IS_MAINNET = NETWORK === "mainnet";

export const INFURA_PROJECT_ID = "1f1ff2b3fca04f8d99f67d465c59e4ef";
export const INFURA_API_KEY = process.env.INFURA_API_KEY || "bb46da3f80e040e8ab73c0a9ff365d18";
export const LEGACY_OPENCERTS_RENDERER = "https://legacy.opencerts.io/";

export const NETWORK_ID = IS_MAINNET ? "1" : "3";
export const NETWORK_NAME = IS_MAINNET ? "homestead" : NETWORK;

export const ETHERSCAN_BASE_URL = `https://${IS_MAINNET ? "" : NETWORK_NAME + "."}etherscan.io/`;
export const MAGIC_API_KEY = process.env.MAGIC_API_KEY || "pk_test_9A196E6A11B0EF87";

export const isDevelopment = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
