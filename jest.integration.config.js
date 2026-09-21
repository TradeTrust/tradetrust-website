const base = require("./jest.config");

// Entries that exist only to shim Node builtins for the jsdom/browser environment. Under the
// node environment they are not just unnecessary but actively wrong: crypto-browserify has no
// `webcrypto` export, and @digitalbazaar/ecdsa-multikey imports exactly that to reach
// `webcrypto.subtle`. With the shim in place every ECDSA verification fails with "Cannot read
// properties of undefined (reading 'subtle')" — which would make a suite that verifies real
// documents assert on nothing.
// Only `node:crypto` is swapped. The other node: shims are still needed — this Jest predates
// `node:`-prefixed specifiers, so removing them leaves the specifier unresolvable entirely, and
// a resolver cannot help either: Jest 26 requires an absolute path back and so cannot express
// "this is a core module".
const moduleNameMapper = {
  ...base.moduleNameMapper,
  "node:crypto": "<rootDir>/_mocks_/nodeCryptoReal.js",
};

/**
 * Real verification of real documents — no mocked verifier.
 *
 * Runs under the node environment because ECDSA verification needs genuine WebCrypto; under
 * jsdom the holder proof cannot be checked and every assertion about a valid presentation would
 * pass for the wrong reason. Kept as its own project, scoped to src/__integration__, because the
 * shared jest.setup.ts touches `document` and `window` (absent here) and because the repo's
 * existing *.integration.test.tsx files are React tests that do need jsdom.
 */
module.exports = {
  ...base,
  displayName: "integration",
  testEnvironment: "node",
  moduleNameMapper,
  setupFiles: ["<rootDir>/jest.integration.setup.ts"],
  setupFilesAfterEnv: [],
  roots: ["<rootDir>/src/__integration__"],
  testMatch: ["**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testTimeout: 120000,
};
