import { FormProps } from "react-jsonschema-form";
type JsonSchema = FormProps<any>["schema"];
type CustomJsonSchema = {
  name: "string";
  properties: {
    [key: string]: JsonSchema;
  };
};

export interface EncryptedJsonWallet {
  // commonplace web3 encrypted wallet object shape, geth parity etc
  address: string;
  id: string;
  version: number;
  Crypto: {
    cipher: string;
    cipherparams: {
      iv: string;
    };
    ciphertext: string;
    kdf: string;
    kdfparams: {
      salt: string;
      n: number;
      dklen: number;
      p: number;
      r: number;
    };
    mac: string;
  };
}

export type DocumentMeta = {
  name: string;
  $template: {
    name: string;
    type: string;
    url: string;
  };
  issuers: Array<{
    name: string;
    tokenRegistry: string;
    identityProof: {
      type: string;
      location: string;
    };
  }>;
};

export interface Config {
  application: {
    wallet: Partial<EncryptedJsonWallet>;
    network: string;
  };
  documentMeta: DocumentMeta;
  formSchema: Array<CustomJsonSchema>;
}
