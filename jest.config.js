module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "scripts/**/*.{ts,tsx,js,jsx}", "!src/**/*.spec.{ts,tsx,js,jsx}"],
  coverageDirectory: "<rootDir>/.coverage/",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/_mocks_/fileMock.js",
    "\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)test.[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testResultsProcessor: "jest-sonar-reporter",
};
