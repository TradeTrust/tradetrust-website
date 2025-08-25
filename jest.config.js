module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "scripts/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.spec.{ts,tsx,js,jsx}",
    "!src/**/*.stories.tsx",
  ],
  coverageDirectory: "<rootDir>/.coverage/",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/_mocks_/fileMock.js",
    "\\.(css|sass|scss)$": "identity-obj-proxy",
    "^swiper/css(/.*)?$": "<rootDir>/_mocks_/fileMock.js",
    "node:stream": "<rootDir>/node_modules/stream-browserify",
    "node:crypto": "<rootDir>/node_modules/crypto-browserify",
    "node:util": "<rootDir>/node_modules/util",
    "node:events": "<rootDir>/node_modules/events",
    "node:process": "<rootDir>/node_modules/process",
    "@tradetrust-tt/tradetrust-utils/constants/network":
      "<rootDir>/node_modules/@tradetrust-tt/tradetrust-utils/dist/cjs/constants/network.js",
    "@tradetrust-tt/tradetrust-utils/constants/supportedChains":
      "<rootDir>/node_modules/@tradetrust-tt/tradetrust-utils/dist/cjs/constants/supportedChains.js",
    "@tradetrust-tt/token-registry-v5/contracts":
      "<rootDir>/node_modules/@tradetrust-tt/token-registry-v5/dist/contracts",
    "@tradetrust-tt/token-registry/contracts": "<rootDir>/node_modules/@tradetrust-tt/token-registry-v5/dist/contracts",
    "@trustvc/trustvc(/.*)": "<rootDir>/node_modules/@trustvc/trustvc/dist/cjs/$1",
    "@digitalbazaar/bls12-381-multikey": "<rootDir>/_mocks_/digitalbazaarMock.js",
    "@digitalbazaar/ecdsa-multikey": "<rootDir>/_mocks_/digitalbazaarMock.js",
    "@digitalbazaar/data-integrity": "<rootDir>/_mocks_/digitalbazaarMock.js",
    "@digitalbazaar/ecdsa-sd-2023-cryptosuite": "<rootDir>/_mocks_/digitalbazaarMock.js",
  },
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.dom.setup.ts"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)test.[jt]s?(x)"],
  transformIgnorePatterns: ["node_modules/?!(@tradetrust-tt).*/"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests/"],
  testTimeout: 10000,
};
