import { getData, v2, v3, WrappedDocument, utils, OpenAttestationDocument } from "@govtechsg/open-attestation";
import { get } from "lodash";
import {
  verificationBuilder,
  openAttestationVerifiers,
  Verifier,
  VerificationFragment,
  VerificationManagerOptions,
  VerificationFragmentType,
  DocumentsToVerify,
  openAttestationDidIdentityProof,
} from "@govtechsg/oa-verify";
import axios, { AxiosRequestConfig } from "axios";
import { NETWORK_NAME } from "../../config";

export interface MetaData {
  documentType: string;
  binaryChecksum: string;
  createdAt: string;
  shipmentName: string;
  shipmentId: string;
  user: string;
  userEmail: string;
  country: string;
}

export interface Document {
  version?: string;
  name: string;
  issuers: any[];
  owner: any[];
  metaData: MetaData;
  dltID: string;
  additionalData: {
    [key: string]: any;
  };
}
export type OpencertsDocumentVerificationFragmentData = {
  value: string;
  status: "VALID" | "INVALID";
};

export const type = "DOCUMENT_STATUS";
export const name = "OpencertsDocumentVerifier";

// NEVER EVER REPLACE OR CHANGE A VALUE :)
// code for errors and invalid fragment
export enum OpencertsDocumentCode {
  INVALID_IDENTITY = 0,
  SKIPPED = 1,
}

const storeToFragment = (document: OpenAttestationDocument, store: any): VerificationFragment => {
  // console.log("store: ",store)

  // is document is valid and not tempered
  if (store.docValid) {
    return {
      data: store.docValid,
      status: "VALID",
      name: "OpenAttestationHash",
      type: "DOCUMENT_INTEGRITY",
    };
  }
  // if issuer is valid and exists in corda network
  if (store.issuerValid == true) {
    return {
      name: "OpenAttestationIssuerIdentityProof",
      type: "ISSUER_IDENTITY",
      data: store.issuerValid,
      status: "VALID",
    };
  } else if (store.issuerValid == false) {
    return {
      reason: {
        code: 2,
        codeString: "INVALID",
        message: `Document issuer is invalid`,
      },
      status: "INVALID",
      name: "OpenAttestationIssuerIdentityProof",
      type: "ISSUER_IDENTITY",
    };
  }

  // if document status is either Issued, Revoked and Consumed
  if (store.status == "Issued") {
    return {
      data: "ISSUED",
      status: "VALID",
      name: "OpenAttestationDocumentIssued",
      type: "DOCUMENT_STATUS",
    };
  } else if (store.status == "Revoked") {
    return {
      data: "REVOKED",
      status: "INVALID",
      name: "OpenAttestationDocumentRevoked",
      type: "DOCUMENT_STATUS",
    };
  } else if (store.status == "Consumed") {
    return {
      name: "OpenAttestationDocumentConsumed",
      type: "DOCUMENT_STATUS",
      data: "CONSUMED",
      status: "VALID",
    };
  }

  // if document is valid against dns-txt type
  if (store.dnsVerified == true) {
    return {
      name: "OpenAttestationDnsTxtIdentityProof",
      type: "ISSUER_IDENTITY",
      data: [
        {
          status: "VALID",
          location: get(document, "issuers[0].identityProof.location"),
          value: "0xc3E9eBc6aDA9BA4B4Ce65D71901Cb2307e9670cE",
        },
      ],
      status: "VALID",
    };
  } else if (store.dnsVerified == false) {
    return {
      data: store.dnsVerified,
      reason: {
        code: 2,
        codeString: "INVALID",
        message: `Document issuers doesn't use DNS-TXT type`,
      },
      status: "INVALID",
      name: "OpenAttestationDnsTxtIdentityProof",
      type: "ISSUER_IDENTITY",
    };
  }
  return {
    data: store,
    reason: {
      code: 0,
      codeString: "DOCUMENT_TAMPERED",
      message: "Document has been tampered with",
    },
    status: "INVALID",
    name: "OpenAttestationHash",
    type: "DOCUMENT_INTEGRITY",
  };
};

export const documentVerifier: Verifier<
  WrappedDocument<v2.OpenAttestationDocument> | WrappedDocument<v3.OpenAttestationDocument>,
  VerificationManagerOptions,
  OpencertsDocumentVerificationFragmentData | OpencertsDocumentVerificationFragmentData[]
> = {
  test: (document) => {
    if (utils.isWrappedV3Document(document)) {
      return true;
    }
    if (utils.isWrappedV2Document(document)) {
      return true;
    }
    return false;
  },
  skip: () => {
    return Promise.resolve({
      status: "SKIPPED",
      type,
      name,
      reason: {
        code: OpencertsDocumentCode.SKIPPED,
        codeString: OpencertsDocumentCode[OpencertsDocumentCode.SKIPPED],
        message: `Document doesn't exist`,
      },
    });
  },
  verify: async (document) => {
    const documentData = getData(document);

    const validateDocRequestConfig: AxiosRequestConfig = {
      method: "post",
      url: `https://chewbacca-dev.blockchain.trames-engineering.com/document/validateTTDocument`,
      data: JSON.stringify(document),
    };
    try {
      const validateDocResponse = await axios(validateDocRequestConfig);
      console.log("validateDocResponse: ", validateDocResponse);

      const response: any = [];

      const dnsFragments = storeToFragment(documentData, { dnsVerified: validateDocResponse.data.dnsVerified });
      response.push(dnsFragments);

      const issuedFragments = storeToFragment(documentData, { status: validateDocResponse.data.status });
      response.push(issuedFragments);

      const docHashFragments = storeToFragment(documentData, { docValid: validateDocResponse.data.isDocValid });
      response.push(docHashFragments);

      const issuerFragments = storeToFragment(documentData, { issuerValid: validateDocResponse.data.issuerValid });
      response.push(issuerFragments);

      return response;
    } catch (error) {
      console.log("caught error: ", error);
      throw new Error(error);
    }
  },
};

export const isValid = (
  verificationFragments: VerificationFragment[],
  types: VerificationFragmentType[] = ["DOCUMENT_STATUS", "DOCUMENT_INTEGRITY", "ISSUER_IDENTITY"]
) => {
  if (verificationFragments.length < 1) {
    throw new Error("Please provide at least one verification fragment to check");
  }
  if (types.length < 1) {
    throw new Error("Please provide at least one type to check");
  }
  return types.every((currentType) => {
    // console.log("currentType: ",currentType)
    // console.log("verificationFragments: ",verificationFragments)
    const verificationFragmentsForType = verificationFragments.filter((fragment) => fragment.type === currentType);
    // console.log("verificationFragmentsForType: ",verificationFragmentsForType)
    // return true if at least one fragment is valid
    // and all fragments are valid or skipped
    const defaultCheck =
      verificationFragmentsForType.some((fragment) => fragment.status === "VALID") &&
      verificationFragmentsForType.every((fragment) => fragment.status === "VALID" || fragment.status === "SKIPPED");

    // return defaultCheck if it's true or if type is DOCUMENT_INTEGRITY or DOCUMENT_STATUS
    if (currentType === "DOCUMENT_STATUS" || currentType === "DOCUMENT_INTEGRITY" || defaultCheck) {
      return defaultCheck;
    }

    // if default check is false and type is issuer identity we need to perform further checks
    const fragmentForDnsTxtVerifier = verificationFragmentsForType.find(
      (fragment) => fragment.name === "OpenAttestationDnsTxtIdentityProof"
    );

    const fragmentForIssuerIdentityVerifier = verificationFragmentsForType.find(
      (fragment) => fragment.name === "OpenAttestationIssuerIdentityProof"
    );

    const fragmentForDocumentIssuedVerifier = verificationFragmentsForType.find(
      (fragment) => fragment.name === "OpenAttestationDocumentIssued"
    );

    const fragmentForDocumentRevokedVerifier = verificationFragmentsForType.find(
      (fragment) => fragment.name === "OpenAttestationDocumentRevoked"
    );

    const fragmentForDocumentConsumedVerifier = verificationFragmentsForType.find(
      (fragment) => fragment.name === "OpenAttestationDocumentConsumed"
    );

    const fragmentForOpenAttestationHashVerifier = verificationFragmentsForType.find(
      (fragment) => fragment.name === "OpenAttestationHash"
    );
    return (
      fragmentForDnsTxtVerifier?.status === "VALID" || // if document fragment is valid then issuer identity is valid
      fragmentForIssuerIdentityVerifier?.data?.status === "VALID" || // otherwise if there is one issuer and it's dns entry is valid then issuer identity is valid
      fragmentForDocumentIssuedVerifier?.data?.every?.((d: any) => d.status === "VALID") || // otherwise if there are multiple bookingData and all of them have valid dns entry then issuer identity is valid
      fragmentForDocumentRevokedVerifier?.data?.every?.((d: any) => d.status === "VALID") ||
      fragmentForDocumentConsumedVerifier?.data?.every?.((d: any) => d.status === "VALID") ||
      fragmentForOpenAttestationHashVerifier?.data?.every?.((d: any) => d.status === "VALID")
    );
  });
};

let customVerify: {
  (arg0: DocumentsToVerify, arg1: { network: string }): any;
  (document: DocumentsToVerify, options: VerificationManagerOptions): Promise<VerificationFragment<any>[]>;
  (document: DocumentsToVerify, options: VerificationManagerOptions): Promise<VerificationFragment<any>[]>;
};
if (NETWORK_NAME === "Corda Enterprise")
  customVerify = verificationBuilder([...openAttestationVerifiers, documentVerifier]);
else customVerify = verificationBuilder([...openAttestationVerifiers, openAttestationDidIdentityProof]);

export const verifyDocument = async (
  document: WrappedDocument<v3.OpenAttestationDocument> | WrappedDocument<v2.OpenAttestationDocument>
) => {
  const response: any = await customVerify(document, {
    network: NETWORK_NAME,
  });
  if (NETWORK_NAME === "Corda Enterprise") {
    const customResponse = response.splice(-1, 1)[0];
    return customResponse;
  }
  return response;
};
