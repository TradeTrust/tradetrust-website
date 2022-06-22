import {
  TitleEscrow as V2TitleEscrowCloneable,
  TradeTrustERC721 as V2TradeTrustERC721,
} from "@govtechsg/token-registry-v2/dist/ts/contracts";
import { TitleEscrowCloneable, TitleEscrowCloneableFactory, TradeTrustERC721 } from "@govtechsg/token-registry";
import { providers, Signer } from "ethers";
import { TradeTrustVersion } from "./connectTokenRegistry";
import { TitleEscrowFactory } from "@govtechsg/token-registry-v2";

export const getConnectedTitleEscrow = async (
  titleEscrowAddress: string,
  provider: providers.Provider | Signer,
  version: TradeTrustVersion
): Promise<{
  titleEscrowContract: TitleEscrowCloneable | V2TitleEscrowCloneable;
}> => {
  if (version === TradeTrustVersion.V3) {
    return { titleEscrowContract: await TitleEscrowCloneableFactory.connect(titleEscrowAddress, provider) };
  } else if (version === TradeTrustVersion.V2) {
    return { titleEscrowContract: await TitleEscrowFactory.connect(titleEscrowAddress, provider) };
  } else {
    throw new Error("Unsupported Tradetrust Version");
  }
};

export const getTitleEscrowAddress = async (
  tokenRegistry: TradeTrustERC721 | V2TradeTrustERC721,
  account: providers.Provider | Signer,
  version: TradeTrustVersion,
  tokenId: string
): Promise<string> => {
  const titleEscrowAddress = await tokenRegistry.ownerOf(tokenId);
  return titleEscrowAddress;
};

export const connectToTitleEscrow = async (
  tokenRegistry: TradeTrustERC721 | V2TradeTrustERC721,
  account: providers.Provider | Signer,
  version: TradeTrustVersion,
  tokenId: string
): Promise<{
  contract: TitleEscrowCloneable | V2TitleEscrowCloneable;
}> => {
  const titleEscrowAddress = await tokenRegistry.ownerOf(tokenId);
  if (version === TradeTrustVersion.V3) {
    return { contract: await TitleEscrowCloneableFactory.connect(titleEscrowAddress, account) };
  } else if (version === TradeTrustVersion.V2) {
    return { contract: await TitleEscrowFactory.connect(titleEscrowAddress, account) };
  } else {
    throw new Error("Unsupported Tradetrust Version");
  }
};
