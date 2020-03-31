import { hexToNumberString } from "web3-utils";
import { getData } from "@govtechsg/open-attestation";
import { ETHERSCAN_BASE_URL } from "../config";

const ethereumAddressMatcher = /^0x[a-fA-F0-9]{40}$/;
export function isEthereumAddress(address) {
  return ethereumAddressMatcher.test(address);
}

export const makeEtherscanAddressURL = (address) => {
  return `${ETHERSCAN_BASE_URL}address/${address}`;
};

export const makeEtherscanTokenURL = ({ registryAddress, tokenId }) => {
  const tokenIdDecimal = hexToNumberString(`0x${tokenId}`);
  return `${ETHERSCAN_BASE_URL}token/${registryAddress}?a=${tokenIdDecimal}`;
};

export const getAssetInfo = (document) => {
  const { tokenRegistry } = getData(document).issuers[0];
  const { merkleRoot: tokenId } = document.signature;
  return { tokenRegistry, tokenId };
};
