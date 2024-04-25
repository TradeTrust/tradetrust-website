import { VerificationFragment, VerificationFragmentWithData, utils, renderedErrorMessageForIDVC } from "@tradetrust-tt/tt-verify";
import React, { FunctionComponent } from "react";
import { StatusChecks } from "./StatusChecks";
import { useSelector } from "react-redux";
import { utils as oaUtils, WrappedDocument, v3, OAv4, TTv4 } from "@tradetrust-tt/tradetrust";
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
    .find((fragment) => utils.isValidFragment(fragment)) as VerificationFragmentWithData;

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

export const getV4IdentityVerificationText = (
  document: WrappedDocument<OAv4.OpenAttestationDocument | TTv4.TradeTrustDocument>
): string => {
  return document.issuer.identityProof.identifier.toUpperCase();
};

export const getIDVCEntityName = (
  document: WrappedDocument<TTv4.TradeTrustDocument>
): string => {
  return document.issuer.identityProof?.identityVC?.data?.credentialSubject?.entityName;
};

export const getIDVCID = (
  document: WrappedDocument<TTv4.TradeTrustDocument>
): string => {
  return document.issuer.identityProof?.identityVC?.data?.credentialSubject?.id ?? "";
};

export const getIDVCLei = (
  document: WrappedDocument<TTv4.TradeTrustDocument>
): string => {
  return document.issuer.identityProof?.identityVC?.data?.credentialSubject?.lei;
};

export const getIDVCIssuanceDate = (
  document: WrappedDocument<TTv4.TradeTrustDocument>
): string => {
  return document.issuer.identityProof?.identityVC?.data?.issuanceDate;
};

export const getIDVCExpirationDate = (
  document: WrappedDocument<TTv4.TradeTrustDocument>
): string => {
  return document.issuer.identityProof?.identityVC?.data?.expirationDate;
};

export const getIDVCIssuer = (
  document: WrappedDocument<TTv4.TradeTrustDocument>
): string => {
  return document.issuer.identityProof?.identityVC?.data.issuer.toString() ?? "";
};

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
  } else if (oaUtils.isWrappedOAV4Document(document)) {
    formattedDomainNames = getV4IdentityVerificationText(document);
  } else if (oaUtils.isWrappedTTV4Document(document)) {
    formattedDomainNames = getV4IdentityVerificationText(document);
  }
  // disabled until alpha tradetrust-tt packages are promoted to master
  // else {
  //   formattedDomainNames = getV4IdentityVerificationText(document);
  // }
  return (
    <h2 id="issuedby" className="my-2 leading-none">
      <span className="mr-2 break-all">{title}</span>
      <span className="text-cerulean-500 break-words">{formattedDomainNames}</span>
    </h2>
  );
};

interface IDVCRenderedErrorMessageProps {
  verificationStatus: VerificationFragment[];
  document: WrappedOrSignedOpenAttestationDocument;
}

export const IDVCRenderedErrorMessage: FunctionComponent<IDVCRenderedErrorMessageProps> = ({ verificationStatus, document }) => {
  if (oaUtils.isWrappedTTV4Document(document)) {
    let errorMessage = renderedErrorMessageForIDVC(verificationStatus);
    return (
      <div className="flex justify-start items-center">
        <div className="flex-grow">
          <p className="pl-2 mt-2 text-sm leading-5 font-bold text-red-500">{errorMessage}</p>
        </div>
      </div>
    );
  }
  return <></>;
};


interface IDVCIssuedByProps {
  document: WrappedOrSignedOpenAttestationDocument;
}

export const IDVCIssuedBy: FunctionComponent<IDVCIssuedByProps> = ({ document }) => {
  if (oaUtils.isWrappedTTV4Document(document)) {
    let IDVCEntityName = getIDVCEntityName(document);
    let IDVCID = getIDVCID(document);
    let IDVCLei = getIDVCLei(document);
    let IDVCIssuanceDate = getIDVCIssuanceDate(document);
    let IDVCExpirationDate = getIDVCExpirationDate(document);
    let IDVCIssuer = getIDVCIssuer(document);
    return (
      <div className="flex justify-start items-center">
        <div className="flex-grow">
          <p className="pl-2 mt-2 text-sm leading-5 font-bold ">Identity VC Information:</p>
          <p className="pl-2 mb-0 text-sm leading-5">1. Issuer: {IDVCIssuer}</p>
          <p className="pl-2 mb-0 text-sm leading-5">2. Entity Name: {IDVCEntityName}</p>
          <p className="pl-2 mb-0 text-sm leading-5">3. Id: {IDVCID}</p>
          <p className="pl-2 mb-0 text-sm leading-5">4. Lei: {IDVCLei}</p>
          <p className="pl-2 mb-0 text-sm leading-5">5. Issuance Date: {IDVCIssuanceDate}</p>
          <p className="pl-2 mb-0 text-sm leading-5">6. Expiration Date: {IDVCExpirationDate}</p>
        </div>
      </div>
    );
  }
  return <></>;
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
    <div className="container">
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
          <IDVCRenderedErrorMessage verificationStatus={verificationStatus} document={document} />
          <IDVCIssuedBy document={document} />
        </div>
      </div>
    </div>
  );
};
