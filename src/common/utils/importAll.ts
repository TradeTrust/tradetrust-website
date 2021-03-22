// https://webpack.js.org/guides/dependency-management/#context-module-api
export const importAll = (r: __WebpackModuleApi.RequireContext) => r.keys().map(r);
