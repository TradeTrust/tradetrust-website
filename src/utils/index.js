import { keccak256 } from "ethereumjs-util";
import { hexToNumberString } from "web3-utils";
import { getData } from "@govtechsg/open-attestation";
import { ETHERSCAN_BASE_URL } from "../config";

function bufSortJoin(...args) {
  return Buffer.concat([...args].sort(Buffer.compare));
}

function toBuf(str) {
  if (str instanceof Buffer) return str;
  return Buffer.from(str, "hex");
}

export function combinedHash(first, second) {
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
export function isEthereumAddress(address) {
  return ethereumAddressMatcher.test(address);
}

export const makeEtherscanTokenURL = ({ registryAddress, tokenId }) => {
  const tokenIdDecimal = hexToNumberString(tokenId);
  return `${ETHERSCAN_BASE_URL}token/${registryAddress}?a=${tokenIdDecimal}`;
};

export const getAssetInfo = document => {
  const { tokenRegistry } = getData(document).issuers[0];
  const { merkleRoot: tokenId } = document.signature;
  return { tokenRegistry, tokenId };
};
