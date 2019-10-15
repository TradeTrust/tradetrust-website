import { keccak256 } from "ethereumjs-util";

function bufSortJoin(...args: Buffer[]) {
  return Buffer.concat([...args].sort(Buffer.compare));
}

type Hash = string | Buffer;

function toBuf(str: Hash) {
  if (str instanceof Buffer) return str;
  return Buffer.from(str, "hex");
}

export function combinedHash(first: Hash, second: Hash) {
  if (!second) {
    return toBuf(first);
  }
  if (!first) {
    return toBuf(second);
  }
  return keccak256(bufSortJoin(toBuf(first), toBuf(second)));
}

export default combinedHash;

const ethereumAddressMatcher = /^0x[a-fA-F0-9]{40}$/;
export function isEthereumAddress(address: string) {
  return ethereumAddressMatcher.test(address);
}
