import {
  DocumentsToVerify,
  openAttestationVerifiers,
  verificationBuilder,
  VerificationFragment,
  verifyDocument as verifyDoc,
} from "@trustvc/trustvc";
import { providers } from "ethers";
import { getCurrentProvider } from "../../common/contexts/provider";
import { getChainInfoFromNetworkName } from "../../common/utils/chain-utils";
import { NETWORK_NAME } from "../../config";
import { ChainInfo } from "../../constants/chain-info";

export enum VerifierType {
  DEMO = "demo",
  CUSTOM = "custom",
}

const demoVerifier = verificationBuilder(openAttestationVerifiers, {
  network: "sepolia",
});

const rpcURL = async (provider: providers.Provider | undefined) => {
  if (provider) {
    const network = await provider.getNetwork();
    return ChainInfo[network.chainId as keyof typeof ChainInfo].rpcUrl;
  }
  if (NETWORK_NAME === "local") {
    const chainId = getChainInfoFromNetworkName(NETWORK_NAME).chainId;
    return ChainInfo[chainId].rpcUrl;
  }
  return ChainInfo[1].rpcUrl || ""; // Provide a default value for the URL
};

export const verifyDocument = async (
  document: DocumentsToVerify,
  verifierType = VerifierType.CUSTOM
): Promise<VerificationFragment[]> => {
  const provider = getCurrentProvider();
  return verifierType === VerifierType.DEMO
    ? demoVerifier(document)
    : verifyDoc(document, (await rpcURL(provider)) as string);
};
