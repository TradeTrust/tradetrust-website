import { hexToNumberString } from "web3-utils";
import { ETHERSCAN_BASE_URL } from "../config";

export const makeEtherscanAddressURL = (address: string) => {
  return `${ETHERSCAN_BASE_URL}address/${address}`;
};

export const makeEtherscanTokenURL = ({ registryAddress, tokenId }: { tokenId: string; registryAddress: string }) => {
  const tokenIdDecimal = hexToNumberString(tokenId.includes("0x") ? tokenId : `0x${tokenId}`);
  return `${ETHERSCAN_BASE_URL}token/${registryAddress}?a=${tokenIdDecimal}`;
};
