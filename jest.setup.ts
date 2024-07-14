import debug from "debug";

// Jest swallows stderr from debug, so if process is called with DEBUG then redirect debug to console.log
if (process.env.DEBUG) {
  debug.log = console.log.bind(console);
}

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
