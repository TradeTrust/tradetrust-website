import {
  SignedVerifiableCredential,
  VerificationFragment,
  VerificationFragmentWithData,
  WrappedDocument,
  getOpencertsRegistryVerifierFragment,
  isWrappedV2Document,
  isWrappedV3Document,
  utils,
  v3,
  vc,
} from "@trustvc/trustvc";
import React, { FunctionComponent } from "react";
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
      case "OpencertsRegistryVerifier":
        const opencertsFragment = getOpencertsRegistryVerifierFragment(verificationStatus);
        const issuerNames = Array.isArray(opencertsFragment?.data)
          ? (opencertsFragment.data as Array<{ name?: string }>).reduce<string[]>((acc, issuer) => {
              const name = issuer?.name;
              if (typeof name === "string" && name.trim().length > 0) {
                acc.push(name);
              }
              return acc;
            }, [])
          : undefined;
        return joinIssuers(issuerNames);
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

export const getW3CIdentityVerificationText = (document: SignedVerifiableCredential): string => {
  return (typeof document?.issuer === "string" ? document?.issuer : document?.issuer?.id)?.toUpperCase();
};

interface IssuedByProps {
  title?: string;
  verificationStatus: VerificationFragment[];
  document: WrappedOrSignedOpenAttestationDocument;
}

export const IssuedBy: FunctionComponent<IssuedByProps> = ({ title = "Issued by", verificationStatus, document }) => {
  if (!document || !verificationStatus) return null;

  let formattedDomainNames;
  if (isWrappedV2Document(document)) {
    formattedDomainNames = getV2FormattedDomainNames(verificationStatus);
  } else if (isWrappedV3Document(document)) {
    formattedDomainNames = getV3IdentityVerificationText(document);
  } else if (vc.isSignedDocument(document)) {
    formattedDomainNames = getW3CIdentityVerificationText(document);
  }

  return (
    <div id="issuedby" className="gap-2 flex flex-col">
      <div className="break-all text-cloud-800">{title}:</div>
      <h4 className="text-cloud-800 leading-none break-all">{formattedDomainNames}</h4>
    </div>
  );
};
