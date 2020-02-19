import { get } from "lodash";
import { Config, DocumentMeta } from "../../types";
import { Wallet } from "ethers";
import { getLogger } from "../../logger";

const { trace } = getLogger("util:config:");

export const getDocumentMetaData = (config: Config): DocumentMeta => {
  const document = get(config, "documentMeta");
  return document;
};

export const getWalletMeta = (config: Config): Wallet => {
  const wallet = get(config, "wallet");
  trace(`wallet meta data is ${JSON.stringify(wallet)}`);
  return wallet;
};
