// Splitting nested-documents test into a separate file, error with testcafe v3 native automation
// https://github.com/DevExpress/testcafe/issues/8243
// https://stackoverflow.com/questions/76806603/how-to-use-disablenativeautomation-in-testcafe-for-one-test-only
module.exports = {
  "appCommand": "npm run serve-static",
  "src": [
    "src/**/nested-documents.spec.ts"
  ],
  "browsers": [
    "chrome"
  ],
  "concurrency": 1,
  "disableNativeAutomation": true,
  // "debugOnFail": "false"
}