import { VerificationFragment, VerificationFragmentWithData, utils } from "@tradetrust-tt/tt-verify";
import React, { FunctionComponent } from "react";
import { StatusChecks } from "./StatusChecks";
import { useSelector } from "react-redux";
import { utils as oaUtils, WrappedDocument, v3 } from "@tradetrust-tt/tradetrust";
import { RootState } from "../../reducers";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";

interface VerificationFragmentData {
  did: string;
  location: string;
  status: string;
}

const getV2FormattedDomainNames = (verificationStatus: VerificationFragment[]) => {
  const joinIssuers = (issuers: string[] | undefined): string => {
    if (!issuers) return "Unknown";
    const issuerNames = issuers.join(", ");
    return issuerNames?.replace(/,(?=[^,]*$)/, " and"); // regex to find last comma, replace with and
  };

  const formatIdentifier = (fragment: VerificationFragmentWithData<VerificationFragmentData[]>): string | undefined => {
    switch (fragment.name) {
      case "OpenAttestationDnsTxtIdentityProof":
      // using fall through to get both cases
      case "OpenAttestationDnsDidIdentityProof":
        return joinIssuers(fragment.data?.map((issuer) => issuer.location.toUpperCase()));
      case "OpenAttestationDidIdentityProof":
        return joinIssuers(fragment.data?.map((issuer) => issuer.did.toUpperCase()));
      default:
        return "Unknown";
    }
  };
  const identityProofFragment = utils
    .getIssuerIdentityFragments(verificationStatus)
    .find((fragment) => utils.isValidFragment(fragment)) as unknown as VerificationFragmentWithData;

  const dataFragment = identityProofFragment?.data;
  const fragmentValidity =
    dataFragment?.length > 0 &&
    dataFragment?.every(
      (issuer: { status: string; verified: boolean }) => issuer.status === "VALID" || issuer.verified === true
    ); // every will return true even though dataFragment is empty, hence the additional check for length

  return fragmentValidity ? formatIdentifier(identityProofFragment) : "Unknown";
};

export const getV3IdentityVerificationText = (document: WrappedDocument<v3.OpenAttestationDocument>): string => {
  return document.openAttestationMetadata.identityProof.identifier.toUpperCase();
};

// disabled until alpha is promoted to master
// export const getV4IdentityVerificationText = (document: WrappedDocument<v4.OpenAttestationDocument>): string => {
//   return document.issuer.identityProof.identifier.toUpperCase();
// };

interface IssuedByProps {
  title?: string;
  verificationStatus: VerificationFragment[];
  document: WrappedOrSignedOpenAttestationDocument;
}

export const IssuedBy: FunctionComponent<IssuedByProps> = ({ title = "Issued by", verificationStatus, document }) => {
  let formattedDomainNames;
  if (oaUtils.isWrappedV2Document(document)) {
    formattedDomainNames = getV2FormattedDomainNames(verificationStatus);
  } else if (oaUtils.isWrappedV3Document(document)) {
    formattedDomainNames = getV3IdentityVerificationText(document);
  }
  // disabled until alpha tradetrust-tt packages are promoted to master
  // else {
  //   formattedDomainNames = getV4IdentityVerificationText(document);
  // }
  return (
    <h4 id="issuedby" className="my-2 leading-none">
      <span className="mr-2 break-all">{title}</span>
      <span className="text-cerulean-500 break-words">{formattedDomainNames}</span>
    </h4>
  );
};

interface DocumentStatusProps {
  isMagicDemo?: boolean;
}

export const DocumentStatus: FunctionComponent<DocumentStatusProps> = ({ isMagicDemo }) => {
  const rootState = useSelector((state: RootState) => state);
  const document = isMagicDemo ? rootState.demoVerify.rawModifiedDocument : rootState.certificate.rawModified;
  const verificationStatus = isMagicDemo
    ? rootState.demoVerify.verificationStatus
    : rootState.certificate.verificationStatus;

  if (!document || !verificationStatus) return null;

  return (
    <div id="document-status" className="py-4">
      <div className="flex flex-col">
        <div className="flex-grow">
          <IssuedBy
            title={isMagicDemo ? "Demo issued by" : "Issued by"}
            verificationStatus={verificationStatus}
            document={document}
          />
        </div>
        <StatusChecks verificationStatus={verificationStatus} />
      </div>
    </div>
  );
};
