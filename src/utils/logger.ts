import debug from "debug";

// not using .extends because of stupid next.js resolve modules bug where its picking up old version of debug
export const trace = (namespace: string): debug.Debugger => debug(`tradetrust-website:trace:${namespace}`);
export const error = (namespace: string): debug.Debugger => debug(`tradetrust-website:error:${namespace}`);

export const getLogger = (namespace: string): { trace: debug.Debugger; error: debug.Debugger } => ({
  trace: trace(namespace),
  error: error(namespace),
});
