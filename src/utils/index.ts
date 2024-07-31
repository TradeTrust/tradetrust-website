import { utils } from "ethers";
import { compareDesc, compareAsc } from "date-fns";
import { ChainId } from "../constants/chain-info";
import { getChainInfo } from "../common/utils/chain-utils";

export const makeEtherscanAddressURL = (address: string, chainId: ChainId): string => {
  const baseUrl = getChainInfo(chainId).explorerUrl;
  return new URL(`/address/${address}`, baseUrl).href;
};

export const isValidEndorseTransfer = (holder?: string, newHolder?: string, newOwner?: string): boolean => {
  if (!newHolder || !newOwner) return false;
  if (newHolder === holder) return false;
  if (!isEthereumAddress(newHolder) || !isEthereumAddress(newOwner)) return false;

  return true;
};

export const isEthereumAddress = (address: string): boolean | undefined => {
  return utils.isAddress(address);
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

/**
 * Takes a file path, i.e. "static/img/image.png" , and returns the file name, i.e. "image.png".
 *
 * @param filePath a string that represents the filePath i.e. "static/img/image.png"
 * @returns name of file i.e. "image.png"
 */
export const getFileName = (filePath: string): string => {
  return (
    filePath.match(/[A-Za-z0-9_\-\.]+\.[A-Za-z0-9]+$/)?.shift() ||
    filePath.match(/[A-Za-z0-9_\-\.]+$/)?.shift() ||
    filePath
  );
};

export const currentDateStr = (): string => {
  return new Date().toLocaleString("en-SG", { hour12: true, timeZoneName: "short" });
};

export const isExternalLink = (url: string): boolean => {
  try {
    const currentHostname = location.hostname;
    const urlHostname = new URL(url).hostname;
    return currentHostname !== urlHostname;
  } catch (error) {
    return false;
  }
};
