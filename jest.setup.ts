import debug from "debug";
import { TextEncoder, TextDecoder } from "util";
import { CryptoKey } from "@peculiar/webcrypto";

Object.assign(global, {
  TextDecoder,
  TextEncoder,
  CryptoKey,
});
// jest.setup.js

// Jest swallows stderr from debug, so if process is called with DEBUG then redirect debug to console.log
if (process.env.DEBUG) {
  debug.log = console.log.bind(console);
}

// src/gasless hooks read this at module load time to gate the sponsored-tx path
process.env.PIMLICO_API_KEY = process.env.PIMLICO_API_KEY || "test-pimlico-key";

// polyfill (https://stackoverflow.com/questions/42213522/mocking-document-createrange-for-jest)
const createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document,
  },
});
window.alert = jest.fn();
window.fetch = jest.fn();

Object.defineProperty(document, "createRange", createRange);
