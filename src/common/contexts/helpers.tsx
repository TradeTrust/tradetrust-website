// import { Magic } from "magic-sdk";
// import { MAGIC_API_KEY } from "../../config";

// export const magic = new Magic(MAGIC_API_KEY, {
//   network: "goerli", // fix to goerli network only
// });

const dummyMagic: unknown = {}; // HOT FIX (removal of magic demo until we make a decision whether to kill it or not)
export const magic = dummyMagic as any; // HOT FIX (removal of magic demo until we make a decision whether to kill it or not)
