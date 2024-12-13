import { Signer, ContractTransaction, ContractReceipt } from "ethers";
import { deployAndWait, connect } from "@tradetrust-tt/document-store";
import { getLogger } from "../../utils/logger";
import { IS_DEVELOPMENT } from "../../config";
import { wrapOADocument, v2, WrappedDocument } from "@trustvc/trustvc";
const { error } = getLogger("services:create");

export const publishDocument = async (
  documentStoreAddress: string,
  wrappedDocument: WrappedDocument<any>,
  signer: Signer
): Promise<void> => {
  const {
    signature: { targetHash },
  } = wrappedDocument;
  const documentStore = await connect(documentStoreAddress, signer);
  const contractTransaction: ContractTransaction = await documentStore.issue(`0x${targetHash}`);
  const contractReceipt: ContractReceipt = await contractTransaction.wait();

  if (!contractReceipt.transactionHash)
    throw new Error(`contractReceipt hash not available: ${JSON.stringify(contractReceipt)}`);
};

export const deployDocumentStore = async (signer: Signer, documentStoreName: string): Promise<string> => {
  try {
    const documentStore = await deployAndWait(documentStoreName, signer);

    return documentStore.address;
  } catch (e: any) {
    error(e.message);
    throw new Error(e.message);
  }
};

export const getWrappedDocument = async (rawDocument: v2.OpenAttestationDocument): Promise<WrappedDocument<any>> => {
  return await wrapOADocument(rawDocument);
};

export const createTempDns = async (documentStoreAddress: string): Promise<string> => {
  const sandboxEndpoint = `https://sandbox.fyntech.io`;

  try {
    const postRes = await fetch(sandboxEndpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: documentStoreAddress,
        networkId: 3,
      }),
    });

    const { executionId } = await postRes.json();

    let identityLocation;

    /**
     * dns-sandbox only allows requests from tradetrust.io,
     * so we just mock the identity location when testing from localhost
     */
    if (IS_DEVELOPMENT) {
      // wont work for verification
      identityLocation = "random-blue-cat";
    } else {
      const getRes = await fetch(`${sandboxEndpoint}/execution/${executionId}`);
      const { name } = await getRes.json();

      identityLocation = name;
    }

    return identityLocation;
  } catch (e: any) {
    error(e.message);
    throw new Error(e.message);
  }
};

export const getFunds = async (address: string): Promise<void> => {
  await fetch(`https://faucet.openattestation.com/donate/${address}`);
};
