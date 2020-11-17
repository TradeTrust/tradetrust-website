import styled from "@emotion/styled";
import { VerificationFragment } from "@govtechsg/oa-verify";
import React from "react";
import { NETWORK_NAME } from "../../config";
import { mixin, vars } from "../../styles";
import { StatusChecks } from "./StatusChecks";

interface DocumentStatusProps {
  verificationStatus: VerificationFragment[];
  className?: string;
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
    <h3 id="issuedby" className={`mb-0 issuedby`}>
      <span className="mr-1">Issued by</span>
      <span className="domain">{dnsIdentity ? `${formattedDomainNames}` : "Unknown"}</span>
    </h3>
  );
};

export const DocumentStatusUnStyled = ({ verificationStatus, className }: DocumentStatusProps) => {
  return (
    <div className={`py-4 ${className}`}>
      <div className="container">
        <div id="document-status" className="statusbar">
          <div className="flex items-center">
            <div className="w-full xl:w-4/12 mb-4 xl:mb-0">
              {NETWORK_NAME !== "local" && <IssuedBy verificationStatus={verificationStatus} />}
            </div>
            <StatusChecks verificationStatus={verificationStatus} />
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
