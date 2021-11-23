import { Magic } from "magic-sdk";
import { MAGIC_API_KEY } from "../../config";

let magic: Magic | any;

if (typeof window !== "undefined") {
  magic = new Magic(MAGIC_API_KEY, {
    network: "ropsten", // fix to ropsten network only
  });
}

export { magic };
