import {
  DocumentsToVerify,
  openAttestationDidIdentityProof,
  openAttestationVerifiers,
  verificationBuilder,
  VerificationFragment,
} from "@govtechsg/oa-verify";
import { providers } from "ethers";
import { getCurrentProvider } from "../../common/contexts/provider";
import { NETWORK_NAME } from "../../config";
import { getChainInfoFromNetworkName } from "../../common/utils/chain-utils";
import { ChainInfo } from "../../constants/chain-info";

export enum VerifierType {
  DEMO = "demo",
  CUSTOM = "custom",
}

const verificationOption = (provider: providers.Provider | undefined) => {
  if (provider) return { provider };
  if (NETWORK_NAME === "local") {
    const chainId = getChainInfoFromNetworkName(NETWORK_NAME).chainId;
    const url = ChainInfo[chainId].rpcUrl;
    return { provider: new providers.JsonRpcProvider(url), network: NETWORK_NAME };
  }
  return { network: NETWORK_NAME };
};

const customVerifier = (provider: providers.Provider | undefined) =>
  verificationBuilder([...openAttestationVerifiers, openAttestationDidIdentityProof], verificationOption(provider));

const demoVerifier = verificationBuilder([...openAttestationVerifiers, openAttestationDidIdentityProof], {
  network: "goerli",
});

export const verifyDocument = async (
  document: DocumentsToVerify,
  verifierType = VerifierType.CUSTOM
): Promise<VerificationFragment[]> => {
  return verifierType === VerifierType.DEMO ? demoVerifier(document) : customVerifier(getCurrentProvider())(document);
};
