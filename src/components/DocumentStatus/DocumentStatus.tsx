import { VerificationFragment, VerificationFragmentWithData, utils } from "@govtechsg/oa-verify";
import React, { FunctionComponent } from "react";
import { NETWORK_NAME } from "../../config";
import { StatusChecks } from "./StatusChecks";
interface DocumentStatusProps {
  verificationStatus: VerificationFragment[];
}

interface VerificationFragmentData {
  did: string;
  location: string;
  status: string;
}

export const IssuedBy: FunctionComponent<DocumentStatusProps> = ({ verificationStatus }) => {
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
  const formattedDomainNames = fragmentValidity ? formatIdentifier(identityProofFragment) : "Unknown";

  return (
    <h2 id="issuedby" className="mb-0 text-cloud-900 text-lg font-semibold">
      <span className="mr-1 inline-block break-all">Issued by</span>
      <span className="text-cerulean inline-block break-all">{formattedDomainNames}</span>
    </h2>
  );
};

export const DocumentStatus: FunctionComponent<DocumentStatusProps> = ({ verificationStatus }) => {
  return (
    <div className="container">
      <div id="document-status" className="py-4">
        <div className="flex flex-col">
          <div className="flex-grow">
            {NETWORK_NAME !== "local" && <IssuedBy verificationStatus={verificationStatus} />}
          </div>
          <StatusChecks verificationStatus={verificationStatus} />
        </div>
      </div>
    </div>
  );
};
