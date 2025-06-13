require('dotenv').config();

module.exports = {
  "appCommand": "npm run serve-static",
  "src": [
    "src/**/*.spec.ts",
    "!src/**/nested-documents.spec.ts"
  ],
  "browsers": [
    "chrome --autoplay-policy=no-user-gesture-required  --allow-insecure-localhost --ignore-certificate-errors"
  ],
  "concurrency": 1,
  "ssl": "pfx=src/test/ca/testingdomain.pfx;rejectUnauthorized=true"
}