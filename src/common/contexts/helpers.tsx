import { Magic } from "magic-sdk";
import { MAGIC_API_KEY } from "../../config";

export const magic = new Magic(MAGIC_API_KEY, {
  network: "goerli", // fix to goerli network only
});
