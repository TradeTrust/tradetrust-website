import React from "react";
import { Input, Button } from "@govtechsg/tradetrust-ui-components";
import { cloneDeep } from "lodash";
import CoveringLetterTemplate from "../../common/assets/covering-letter-gt.json";
import { wrapDocument } from "@govtechsg/open-attestation";
import { useProviderContext } from "../../common/contexts/provider";
import { providers, Signer } from "ethers";
import { DocumentStoreFactory } from "@govtechsg/document-store";
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";

interface FormInterface {
  title: string;
  remarks: string;
}

const defaultForm = {
  title: "",
  remarks: "",
};

interface Attachments {
  allow: boolean;
  accept?: string;
}
interface Template {
  name: string;
  type: string;
  defaults: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  schema: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  attachments?: Attachments;
  headers?: string[];
  uiSchema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  extension?: string;
}

const SANDBOXCREATE_URI = "https://sandbox.openattestation.com";
const TEMPDNSRECORD = "short-beige-grasshopper.sandbox.openattestation.com";
const DOCSTORE = "0xCf599d72C05Fff51E0fA3dC935765648C3bf7cF7";

const STORENAME = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], separator: "-" });

const request = (url: string, options?: RequestInit): Promise<any> => {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`unexpected response ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json());
};

const makeRawDocumentFromTemplate = (template: Template, data: FormInterface) => {
  const deepCopy = cloneDeep(template.defaults);
  const issuers = [
    {
      name: "Demo Issuer",
      documentStore: DOCSTORE,
      identityProof: {
        type: "DNS-TXT",
        location: TEMPDNSRECORD,
      },
    },
  ];
  const rawDocument = { ...deepCopy, ...data, issuers };
  console.log(rawDocument);
  return rawDocument;
};

interface PublishDocumentArgs {
  signer: providers.Provider | Signer;
  targetHash: string;
}
const publishDocument = async ({ signer, targetHash }: PublishDocumentArgs) => {
  const contractAddress = DOCSTORE;
  const documentStore = DocumentStoreFactory.connect(contractAddress, signer);
  const receipt = await documentStore.issue(`0x${targetHash}`);
  const tx = await receipt.wait();
  if (!tx.transactionHash) throw new Error(`Tx hash not available: ${JSON.stringify(tx)}`);
  console.log(tx.transactionHash);
  return tx.transactionHash;
};

const deployDocumentStore = async (signer: Signer) => {
  const factory = new DocumentStoreFactory(signer);
  const tx = await factory.deploy(STORENAME);
  console.log(tx);
  return tx.deployTransaction.wait();
};

const makeTempDNSrecord = async () => {
  const body = {
    address: DOCSTORE,
    networkId: 3,
  };
  const { executionId } = await request(SANDBOXCREATE_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { name, expiryDate } = await request(`${SANDBOXCREATE_URI}/execution/${executionId}`);
  console.log(name, expiryDate);
};

export default function DemoVerifiableDocument() {
  const { provider: signer } = useProviderContext();
  const [form, setForm] = React.useState<FormInterface>(defaultForm);
  const [hasError, setHasError] = React.useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const rawDocument = makeRawDocumentFromTemplate(CoveringLetterTemplate, form);
    const wrappedDocument = await wrapDocument(rawDocument);
    const {
      signature: { targetHash },
    } = wrappedDocument;
    await publishDocument({ signer, targetHash });

    console.log(wrappedDocument);

    // construct raw document out of template
    // wrap raw document
    // connect to doc store to issue (needs merkleroot) 
    // wait for tx to be completed
    // error handle
    // things not considered (temp storage with our api)
  };

  return (
    <>
      <button
        onClick={() => {
          deployDocumentStore(signer as Signer);
        }}
      >
        deploy doc store
      </button>
      <br />
      <button onClick={makeTempDNSrecord}>make temp dns record</button>
      <br />
      <form className="my-6" onSubmit={handleFormSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleInputChange}
          className="mb-2"
          hasError={hasError}
          errorMessage={hasError ? "required" : ""}
        />
        <Input type="text" name="remarks" placeholder="Remarks" onChange={handleInputChange} className="mb-2" />
        <Button className="bg-orange text-white hover:bg-orange-600 w-full" disabled={hasError}>
          Issue document
        </Button>
      </form>
    </>
  );
}
