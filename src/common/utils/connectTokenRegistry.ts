import { providers, Signer } from "ethers";
import { TradeTrustERC721Factory } from "@govtechsg/token-registry";
import { TradeTrustERC721 } from "@govtechsg/token-registry";
import { TradeTrustERC721 as V2TradeTrustERC721 } from "@govtechsg/token-registry-v2/dist/ts/contracts";
import { ERC165 } from "@govtechsg/token-registry/dist/types/contracts";
import { getLogger } from "../../utils/logger";
import { TradeTrustErc721Factory } from "@govtechsg/token-registry-v2";

const { error } = getLogger("services:supportsinterface");

export const supportsInterface = async (
  contractInstance: ERC165,
  interfaceId: string,
  staticCall = true
): Promise<boolean | undefined> => {
  let isSameInterfaceType;
  try {
    if (staticCall) {
      isSameInterfaceType = await contractInstance.callStatic.supportsInterface(interfaceId);
    } else {
      isSameInterfaceType = await contractInstance.supportsInterface(interfaceId);
    }

    return isSameInterfaceType;
  } catch (supportsInterfaceErrorMessage: unknown) {
    if (!(supportsInterfaceErrorMessage instanceof Error)) {
      error(supportsInterfaceErrorMessage);
      throw supportsInterfaceErrorMessage;
    }
    if (
      supportsInterfaceErrorMessage.message.includes("revert") ||
      supportsInterfaceErrorMessage.message.includes("cannot estimate gas")
    ) {
      return false;
    }
  }
};

export enum TradeTrustVersion {
  V2 = 2,
  V3 = 3,
}

export const getConnectedTokenRegistry = async (
  account: providers.Provider | Signer,
  contractAddress: string
): Promise<{
  contract: TradeTrustERC721 | V2TradeTrustERC721;
  version: TradeTrustVersion;
}> => {
  const ERC721Contract = TradeTrustERC721Factory.connect(contractAddress, account);
  const isV2 = await supportsInterface(ERC721Contract, "0x9f9e69f3");
  if (isV2 === undefined) {
    throw new Error("Invalid Contract");
  } else if (isV2) {
    return {
      contract: TradeTrustErc721Factory.connect(contractAddress, account),
      version: TradeTrustVersion.V2,
    };
  }
  return {
    contract: TradeTrustERC721Factory.connect(contractAddress, account),
    version: TradeTrustVersion.V3,
  };
};
