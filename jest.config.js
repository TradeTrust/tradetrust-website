module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverage: false,
  coverageDirectory: "<rootDir>/.coverage/",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "scripts/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.spec.{ts,tsx,js,jsx}"
  ],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)test.[jt]s?(x)"],
  moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/_mocks_/fileMock.js",
    "\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  testResultsProcessor: "jest-sonar-reporter"
};
