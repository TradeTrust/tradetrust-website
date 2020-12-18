import { utils } from "ethers";
import { ETHERSCAN_BASE_URL } from "../config";

export const makeEtherscanAddressURL = (address: string) => {
  return `${ETHERSCAN_BASE_URL}address/${address}`;
};

export const isEthereumAddress = (address: string) => {
  try {
    if (utils.getAddress(address)) {
      return true;
    }
  } catch (e) {
    if (e.reason === "invalid address") {
      return false;
    } else throw e;
  }
};
