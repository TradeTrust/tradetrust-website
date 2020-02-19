import { TokenRegistry, WriteableTitleEscrowOwner, TitleEscrowOwner } from "@govtechsg/oa-token";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { getData } from "@govtechsg/tradetrust-schema";
import { getLogger } from "../logger";
import { Wallet, ethers } from "ethers";
import { get } from "lodash";

const { trace } = getLogger("saga:tokenService");

interface InitializeTokenInterface {
  document: WrappedDocument<any>;
  web3Provider: ethers.providers.BaseProvider | undefined;
  wallet: Wallet | undefined;
}

let registryInstance: TokenRegistry;
let titleEscrowOwnerInstance: TitleEscrowOwner;

export const initializeTokenInstance = async ({
  document,
  web3Provider = undefined,
  wallet = undefined
}: InitializeTokenInterface): Promise<void> => {
  trace(`web3 provider is: ${web3Provider} and wallet is: ${wallet}`);
  trace(`document to initialize ${JSON.stringify(document)}`);
  if (!document || !web3Provider || !wallet) throw new Error("Can not initialize the token instance");
  const documentData = getData(document);
  const contractAddress = get(documentData, "issuers[0].tokenRegistry", "");
  trace(`contract address is : ${contractAddress}`);
  if (!contractAddress) throw new Error("Please submit valid token");
  registryInstance = await new TokenRegistry({ contractAddress, web3Provider, wallet });
  trace(`token Instance: ${registryInstance}`);
};

export const mintToken = async (document: WrappedDocument<any>, newOwner: string): Promise<void> => {
  trace(`initial address to mint is: ${JSON.stringify(newOwner)}`);
  await registryInstance.mint(document, newOwner);
};

export const deployEscrowContract = async ({
  registryAddress,
  beneficiaryAddress,
  holderAddress,
  web3Provider,
  wallet
}: {
  registryAddress: string;
  beneficiaryAddress: string;
  holderAddress: string;
  wallet: Wallet;
  web3Provider: ethers.providers.BaseProvider;
}): Promise<void> => {
  titleEscrowOwnerInstance = await WriteableTitleEscrowOwner.deployEscrowContract({
    registryAddress,
    beneficiaryAddress,
    holderAddress,
    wallet,
    web3Provider
  });
};

export const getTitleEscrowOwner = (): string => {
  return titleEscrowOwnerInstance.address;
};
