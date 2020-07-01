import { getLogger } from "../utils/logger";

const { trace } = getLogger("config");
const NETWORK = process.env.NET || "ropsten";

export const IS_MAINNET = NETWORK === "mainnet";

export const CAPTCHA_CLIENT_KEY = "6LfiL3EUAAAAAHrfLvl2KhRAcXpanNXDqu6M0CCS";
export const EMAIL_API_URL = IS_MAINNET ? "https://api.opencerts.io/email" : "https://api-ropsten.opencerts.io/email";
export const INFURA_PROJECT_ID = "1f1ff2b3fca04f8d99f67d465c59e4ef";
export const LEGACY_OPENCERTS_RENDERER = "https://legacy.opencerts.io/";

export const NETWORK_ID = IS_MAINNET ? "1" : "3";
export const NETWORK_NAME = IS_MAINNET ? "homestead" : NETWORK;

export const ETHERSCAN_BASE_URL = `https://${IS_MAINNET ? "" : NETWORK_NAME + "."}etherscan.io/`;

trace(`CAPTCHA_CLIENT_KEY: ${CAPTCHA_CLIENT_KEY}`);
trace(`EMAIL_API_URL: ${EMAIL_API_URL}`);
