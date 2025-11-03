require('dotenv').config();

// Splitting nested-documents test into a separate file, error with testcafe v3 native automation
// https://github.com/DevExpress/testcafe/issues/8243
// https://stackoverflow.com/questions/76806603/how-to-use-disablenativeautomation-in-testcafe-for-one-test-only

module.exports = {
  "appCommand": "npm run serve-static",
  "src": [
    "src/**/nested-documents.spec.ts"
  ],
  "browsers": [
    "chrome --autoplay-policy=no-user-gesture-required  --allow-insecure-localhost --ignore-certificate-errors --disable-features=LocalNetworkAccessChecks --disable-web-security --allow-running-insecure-content --disable-features=VizDisplayCompositor"
  ],
  "concurrency": 1,
  "ssl": "pfx=src/test/ca/testingdomain.pfx;rejectUnauthorized=true",
  "disableNativeAutomation": true,
  // "debugOnFail": "false"
}