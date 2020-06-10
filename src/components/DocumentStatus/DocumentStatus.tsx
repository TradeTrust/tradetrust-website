import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";
import { StatusChecks } from "./StatusChecks";
import { VerificationFragment } from "@govtechsg/oa-verify";

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
    <div className={`py-3 ${className}`}>
      <div className="container-custom">
        <div id="document-status" className="statusbar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-12 col-xl-4 mb-3 mb-xl-0">
                <IssuedBy verificationStatus={verificationStatus} />
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

  svg {
    color: ${vars.teal};

    .x-circle {
      color: ${vars.red};
    }
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
