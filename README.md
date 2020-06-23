# TradeTrust Web UI

[![CircleCI](https://circleci.com/gh/TradeTrust/tradetrust-website.svg?style=svg)](https://circleci.com/gh/TradeTrust/tradetrust-website)

See also:

* [tradetrust-documentation](https://docs.tradetrust.io)
* [open-certificate](https://github.com/OpenCerts/open-certificate)
* [certificate-contract](https://github.com/OpenCerts/certificate-store-contract)
* [certificate-cli](https://github.com/OpenCerts/certificate-cli)


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

`NET` is used for setting the default network, setting it to `mainnet` uses the public Ethereum network. If it is not set it defaults to Ropsten testnet.
It can also take any network names that Ethers.JS supports, such as `rinkeby`, `kovan`, etc.
However do note that there are only drag & drop demo files provided for main net and ropsten.

E.g:
```bash
NET=mainnet npm run dev
```
or
```bash
NET=rinkeby npm run dev
```

### Troubleshooting

To enable debug logs in the browser, set `localStorage.debug="*"`

### Running single integration test

`npm run integration:single <path>`, for the path, you can copy paste relative path via text editor.

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

### Generating CREDITS.md

Run `npx @opengovsg/credits-generator`

###### Module build failed

If you see module build failure message like:
```
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
ModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):
Error: ENOENT: no such file or directory, scandir 'D:\opencerts-website\node_modules\node-sass\vendor'
at Object.readdirSync (fs.js:783:3)
```

Try running `npm rebuild`

