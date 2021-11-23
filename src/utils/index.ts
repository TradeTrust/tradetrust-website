import { utils } from "ethers";
import { ETHERSCAN_BASE_URL } from "../config";
import { compareDesc, compareAsc } from "date-fns";

export const makeEtherscanAddressURL = (address: string): string => {
  return `${ETHERSCAN_BASE_URL}address/${address}`;
};

export const isEthereumAddress = (address: string): boolean | undefined => {
  try {
    if (utils.getAddress(address)) {
      return true;
    }
  } catch (e: any) {
    if (e.reason === "invalid address") {
      return false;
    } else throw e;
  }
};

export const convertSecondsToMinAndSec = (seconds: number): string => {
  const sec = seconds % 60;
  return `${~~(seconds / 60)}:${sec < 10 ? `0${sec}` : sec}m`;
};

export const getSortedByDateDesc = (items: any[]): any[] => {
  items.sort((a, b): number => {
    return compareDesc(new Date(a.attributes.date), new Date(b.attributes.date));
  });

  return items;
};

export const getSortedByDateAsc = (items: any[]): any[] => {
  items.sort((a, b): number => {
    return compareAsc(new Date(a.attributes.date), new Date(b.attributes.date));
  });

  return items;
};

// https://docs.netlify.com/forms/setup/#submit-javascript-rendered-forms-with-ajax
export const encode: any = (data: { [x: string]: string | number | boolean }) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const addClassNameIfExist = (className?: string): string => {
  if (!className) {
    return "";
  }

  return className;
};
