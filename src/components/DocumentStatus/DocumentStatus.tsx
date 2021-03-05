import styled from "@emotion/styled";
import { VerificationFragment } from "@govtechsg/oa-verify";
import React from "react";
import tw from "twin.macro";
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

export const IssuedBy = ({ verificationStatus }: DocumentStatusProps) => {
  const joinIssuers = (issuers: string[] | undefined): string => {
    if (!issuers) return "Unknown";
    const issuerNames = issuers.join(", ");
    return issuerNames?.replace(/,(?=[^,]*$)/, " and"); // regex to find last comma, replace with and
  };
  const formatIdentifier = (fragment: VerificationFragment<VerificationFragmentData[]>): string | undefined => {
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

  const identityProofFragment = verificationStatus.find(
    (status) => status.type === "ISSUER_IDENTITY" && status.status === "VALID"
  ) as VerificationFragment;
  const dataFragment = identityProofFragment.data;
  const fragmentValidity =
    dataFragment.length > 0 && dataFragment.every((issuer: { status: string }) => issuer.status === "VALID"); // every will return true even though dataFragment is empty, hence the additional check for length
  const formattedDomainNames = fragmentValidity ? formatIdentifier(identityProofFragment) : "Unknown";

  return (
    <h3 id="issuedby" className="mb-0 issuedby">
      <span className="mr-1">Issued by</span>
      <span className="domain">{formattedDomainNames}</span>
    </h3>
  );
};

export const DocumentStatus = ({ verificationStatus }: DocumentStatusProps) => {
  return (
    <DocumentStatusStyles>
      <div className="container">
        <div id="document-status" className="statusbar">
          <div className="flex flex-col xl:flex-row">
            <div className="flex-grow">
              {NETWORK_NAME !== "local" && <IssuedBy verificationStatus={verificationStatus} />}
            </div>
            <StatusChecks verificationStatus={verificationStatus} />
          </div>
        </div>
      </div>
    </DocumentStatusStyles>
  );
};

const DocumentStatusStyles = styled.div`
  ${tw`py-4`}

  .statusbar {
    ${tw`bg-white p-4 rounded`}
  }

  .issuedby {
    ${tw`text-grey-700 text-lg font-semibold`}

    span {
      ${tw`inline-block`}
      word-break: break-all;
    }

    .domain {
      ${tw`text-blue`}
    }
  }

  .message {
    ${tw`text-sm leading-5`}
  }
`;
