import { TextEncoder, TextDecoder } from "util";
import { runInThisContext } from "vm";

/**
 * Re-exposes the Node globals that Jest 26's node sandbox omits.
 *
 * The sandbox is an old vm context and predates much of Node 18's global surface — Event,
 * EventTarget, AbortSignal, fetch, ReadableStream and friends are all missing, and the verifier
 * stack reaches for them. Enumerating them by hand turned into whack-a-mole (each fix surfaced
 * the next ReferenceError), so the real global object is fetched through `vm` and anything
 * absent from the sandbox is copied over.
 *
 * Only missing names are copied, so nothing Jest itself installs is clobbered. Unlike
 * jest.setup.ts this touches no `document` or `window`: neither exists here, and this suite
 * verifies real documents with real crypto rather than rendering anything.
 */
const realGlobal = runInThisContext("globalThis") as Record<string, unknown>;

for (const name of Object.getOwnPropertyNames(realGlobal)) {
  if ((global as Record<string, unknown>)[name] === undefined) {
    try {
      (global as Record<string, unknown>)[name] = realGlobal[name];
    } catch {
      // Some globals are non-writable accessors; skipping one is fine — the loop only fills
      // gaps, and anything genuinely required will surface as a clear ReferenceError.
    }
  }
}

Object.assign(global, { TextDecoder, TextEncoder });

// `self` is a browser alias for the global object. It is not a Node global, but the util module
// under test transitively imports browser-oriented packages (address-identity-resolver via the
// provider context) that reference it at module load.
(global as Record<string, unknown>).self = global;
