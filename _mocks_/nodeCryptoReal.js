// Node's real crypto, for the node-environment integration suite.
//
// The jsdom config maps `node:crypto` onto crypto-browserify, which does NOT export
// `webcrypto`. @digitalbazaar/ecdsa-multikey reads `webcrypto.subtle` from it, so with that
// shim in place every ECDSA verification fails with "Cannot read properties of undefined
// (reading 'subtle')" — and a suite verifying real documents would assert on nothing.
module.exports = require("crypto");
