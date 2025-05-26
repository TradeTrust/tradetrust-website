import debug from "debug";
import { TextEncoder, TextDecoder } from "util";
Object.assign(global, {
  TextDecoder,
  TextEncoder,
});
// jest.setup.js

// Jest swallows stderr from debug, so if process is called with DEBUG then redirect debug to console.log
if (process.env.DEBUG) {
  debug.log = console.log.bind(console);
}
