import axios, { AxiosAdapter } from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

export const cachedAxios = axios.create({
  headers: { "Cache-Control": "no-cache" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter), // Typecast suggested by author to force non-null typing: https://github.com/kuitos/axios-extensions/issues/8
});
