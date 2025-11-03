// Splitting nested-documents test into a separate file, error with testcafe v3 native automation
// https://github.com/DevExpress/testcafe/issues/8243
// https://stackoverflow.com/questions/76806603/how-to-use-disablenativeautomation-in-testcafe-for-one-test-only
module.exports = {
  "appCommand": "npm run serve-static",
  "src": [
    "src/**/nested-documents.spec.ts"
  ],
  "browsers": [
    "chrome:headless --autoplay-policy=no-user-gesture-required --allow-insecure-localhost --ignore-certificate-errors --disable-features=LocalNetworkAccessChecks"
  ],
  "concurrency": 1,
  "ssl": "pfx=src/test/ca/testingdomain.pfx;rejectUnauthorized=true",
  "cache": true,
  "selectorTimeout": 45000,
  "assertionTimeout": 25000,
  "pageLoadTimeout": 60000,
  "ajaxRequestTimeout": 120000,
  "pageRequestTimeout": 180000,
  "browserInitTimeout": 180000,
  "testExecutionTimeout": 180000,
  "runExecutionTimeout": 1000000,
  "disableNativeAutomation": true,
  "color": true,
  "speed": 1,
  "reporter": [
    {
      "name": "spec"
    },
    {
      "name": "spec",
      "output": "artifacts/report.json"
    }
  ],
  "quarantineMode": {
    "successThreshold": 1,
    "attemptLimit": 3
  },
  "screenshots": {
    "path": "artifacts/screenshots",
    "pathPattern": "${USERAGENT}/test-${TEST_INDEX}-${USERAGENT}-${FILE_INDEX}.png",
    "takeOnFails": true,
    "fullPage": true
  }
}