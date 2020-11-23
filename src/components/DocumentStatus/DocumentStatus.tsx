import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";
import { StatusChecks } from "./StatusChecks";
import { VerificationFragment } from "@govtechsg/oa-verify";
import { NETWORK_NAME } from "../../config";

interface DocumentStatusProps {
  verificationStatus: VerificationFragment[];
  className?: string;
}

interface VerificationFragmentData {
  did: string;
  location: string;
  status: string;
}

export const IssuedBy = ({ verificationStatus }: DocumentStatusProps) => {
  const formatDomainNames = (fragment: VerificationFragment<VerificationFragmentData[]>): string | undefined => {
    switch (fragment.name) {
      case "OpenAttestationDnsTxtIdentityProof":
      // using fall through to get both cases
      case "OpenAttestationDnsDidIdentityProof":
        const domainNames = fragment.data?.map((issuer) => issuer.location.toUpperCase()).join(", ");
        return domainNames?.replace(/,(?=[^,]*$)/, " and"); // regex to find last comma, replace with and
      case "OpenAttestationDidIdentityProof":
        const didNames = fragment.data?.map((issuer) => issuer.did.toUpperCase()).join(", ");
        return didNames?.replace(/,(?=[^,]*$)/, " and"); // regex to find last comma, replace with and
      default:
        return "Unknown";
    }
  };

  const identityProofFragment = verificationStatus.find(
    (status) => status.type === "ISSUER_IDENTITY" && status.status === "VALID"
  ) as VerificationFragment;
  const dataFragment = identityProofFragment?.data;
  const fragmentValidity = dataFragment?.every((issuer: { status: string }) => issuer.status === "VALID");
  const formattedDomainNames = fragmentValidity ? formatDomainNames(identityProofFragment) : "Unknown";

  return (
    <h3 id="issuedby" className={`mb-0 issuedby`}>
      <span className="mr-1">Issued by</span>
      <span className="domain">{formattedDomainNames}</span>
    </h3>
  );
};

export const DocumentStatusUnStyled = ({ verificationStatus, className }: DocumentStatusProps) => {
  return (
    <div className={`py-3 ${className}`}>
      <div className="container-custom">
        <div id="document-status" className="statusbar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-12 col-xl-4 mb-3 mb-xl-0">
                {NETWORK_NAME !== "local" && <IssuedBy verificationStatus={verificationStatus} />}
              </div>
              <StatusChecks verificationStatus={verificationStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DocumentStatus = styled(DocumentStatusUnStyled)`
  .statusbar {
    background-color: ${vars.white};
    padding: 10px 0;
    border-radius: ${vars.buttonRadius};
  }

  .issuedby {
    color: ${vars.greyDark};
    ${mixin.fontSourcesansproBold};
    ${mixin.fontSize(18)};

    span {
      display: inline-block;
      word-break: break-all;
    }

    .domain {
      color: ${vars.brandBlue};
    }
  }

  .message {
    line-height: 1.2;
    ${mixin.fontSize(14)};
  }
`;
