import { utils } from "ethers";
import { ETHERSCAN_BASE_URL } from "../config";

export const makeEtherscanAddressURL = (address: string): string => {
  return `${ETHERSCAN_BASE_URL}address/${address}`;
};

export const isEthereumAddress = (address: string): boolean | undefined => {
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

export const convertSecondsToMinAndSec = (seconds: number): string => {
  const sec = seconds % 60;
  return `${~~(seconds / 60)}:${sec < 10 ? `0${sec}` : sec}m`;
};
