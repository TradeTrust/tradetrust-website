import { Magic } from "magic-sdk";
import { MAGIC_API_KEY, isDevelopment } from "../../config";

export const magic = new Magic(MAGIC_API_KEY, {
  network: "ropsten", // fix to ropsten network only
  testMode: isDevelopment,
});
