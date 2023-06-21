# TradeTrust Web UI

[![CI](https://github.com/TradeTrust/tradetrust-website/workflows/CI/badge.svg)](https://github.com/TradeTrust/tradetrust-website/actions?query=workflow%3ACI)

See also:

- [tradetrust-documentation](https://docs.tradetrust.io)
- [document-store](https://github.com/Open-Attestation/document-store)
- [open-attestation-cli](https://github.com/Open-Attestation/open-attestation-cli)

## Development

We develop primarily on a OS X / Linux environment so please lodge an issue if you are using Windows and find that you cannot successfully set up a local instance of this software.

### OS X / Linux

```bash
npm install
npm run dev
```

### Windows

For Windows you need to set up the toolchain for node-gyp before installing this repository, follow the instructions in https://github.com/nodejs/node-gyp#on-windows.

```bash
npm install
npm run dev
```

### Environmental Variables

`NET` is used for setting the default network, setting it to `mainnet` uses the public Ethereum network. If it is not set it defaults to Sepolia testnet.
It can also take any network names that Ethers.JS supports, such as `sepolia`, `maticmum`, etc.
However do note that there are only drag & drop demo files provided for main net, goerli(deprecated), sepolia and polygon mumbai.

E.g:

```bash
NET=mainnet npm run dev
```

or

```bash
NET=sepolia npm run dev
```

### Troubleshooting

To enable debug logs in the browser, set `localStorage.debug="*"`

### Test single feature flag

To test, simply run the following in console and refresh the website:

```
localStorage.setItem("FEATURE_FLAG", JSON.stringify({ADDRESS_BOOK_UPLOAD: true}))
```

or

```
localStorage.FEATURE_FLAG =  JSON.stringify({ADDRESS_BOOK_UPLOAD: true})
```

### Test all feature flags

```
localStorage.setItem("FEATURE_FLAG", JSON.stringify({ALL: true}))
```

or

```
localStorage.FEATURE_FLAG =  JSON.stringify({ALL: true})
```

### Module build failed

If you see module build failure message like:

```
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
ModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):
Error: ENOENT: no such file or directory, scandir 'D:\opencerts-website\node_modules\node-sass\vendor'
at Object.readdirSync (fs.js:783:3)
```

Try running `npm rebuild`

### Generating CREDITS.md

`npm run credits`

### Running single integration test (testcafe)

`npm run integration:single <path>`, for the path, you can copy paste relative path via text editor.

### Running single integration test (synpress)

- Go to package.json
- Under scripts `integration:synpress`, add a `-s <path>`, for the path should look something like: i.e.`tests/e2e/spec/test.spec.js`
- then add this code to initialise the metamask with account 2:

```
it("should import account 2 and connect all metamask wallets to dapp", () => {
   cy.importMetamaskAccount("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879").should("be.true");
   cy.switchMetamaskAccount(1).should("be.true");

   cy.connectWallet();
   cy.acceptMetamaskAccess(true).should("be.true");
 });
```

- Run `npm run integration:headful`

_remove step 2 and 3 once test is done, and check all test cases passes before pushing to github_

### Managing Netlify CMS

- Enable Identity + Git Gateway
- https://www.netlifycms.org/docs/add-to-your-site/#enable-identity-and-git-gateway

### Inviting users to Netlify CMS

- Go to https://www.netlify.com and login netlify
- Choose `DLT` > `Sites` > `tradetrust.io` site
- Click `Identity`, invite user via email address

### Debugging Netlify CMS locally

https://www.netlifycms.org/docs/beta-features/#working-with-a-local-git-repository

1. run `npx netlify-cms-proxy-server`
2. run `npm run dev`
3. access admin page by `http://localhost:3000/imd@/`
