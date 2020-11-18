import styled from "@emotion/styled";
import { VerificationFragment } from "@govtechsg/oa-verify";
import React from "react";
import { NETWORK_NAME } from "../../config";
import { mixin, vars } from "../../styles";
import { StatusChecks } from "./StatusChecks";

interface DocumentStatusProps {
  verificationStatus: VerificationFragment[];
}

export const IssuedBy = ({ verificationStatus }: DocumentStatusProps) => {
  const dnsFragmentName = "OpenAttestationDnsTxt";
  const dnsFragment = verificationStatus.find((status) => status.name === dnsFragmentName);
  const dnsIdentity = dnsFragment?.data?.every((issuer: { status: string }) => issuer.status === "VALID");
  const domainNames = dnsFragment?.data
    ?.map((issuer: { location: string }) => issuer.location.toUpperCase())
    .join(", ");
  const formattedDomainNames = domainNames?.replace(/,(?=[^,]*$)/, " and"); // regex to find last comma, replace with and

  return (
    <h3 id="issuedby" className="mb-0 issuedby">
      <span className="mr-1">Issued by</span>
      <span className="domain">{dnsIdentity ? `${formattedDomainNames}` : "Unknown"}</span>
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
  padding: 1rem 0;

  .statusbar {
    background-color: ${vars.white};
    padding: 1rem;
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
