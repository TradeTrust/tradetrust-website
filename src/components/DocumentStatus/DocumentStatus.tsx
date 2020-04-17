import React from "react";
import styled from "@emotion/styled";
import { TYPES, MESSAGES } from "../../constants/VerificationErrorMessages";
import { isValid } from "../../services/verify/fragments";
import { getAllButRevokeFragment, getRevokeFragment, certificateNotIssued } from "../../services/verify/fragments";
import { SvgIcon, SvgIconCheckCircle, SvgIconXCircle } from "./../UI/SvgIcon";
import { mixin, vars } from "../../styles";

interface StatusProps {
  message: string;
  icon: React.ReactNode;
}

const Status = ({ message, icon }: StatusProps) => (
  <div className="status">
    <div className="row no-gutters align-items-center">
      <div className="col-auto">
        <SvgIcon>{icon}</SvgIcon>
      </div>
      <div className="col">
        <p className="pl-2 mb-0 message">{message}</p>
      </div>
    </div>
  </div>
);

interface StatusCheck {
  valid: boolean;
  messageSet: {
    failureTitle: string;
    successTitle: string;
    failureMessage: string;
  };
}

const StatusCheck = ({ valid, messageSet }: StatusCheck) => {
  const message = valid ? messageSet.successTitle : messageSet.failureTitle;
  const icon = valid ? <SvgIconCheckCircle /> : <SvgIconXCircle />;

  return <Status message={message} icon={icon} />;
};

interface DocumentStatusProps {
  verificationStatus: {
    name: string;
    type: string;
    status: string;
    data: {
      status: string;
      location: string;
    }[];
  }[];
  className?: string;
}

export const IssuedBy = ({ verificationStatus }: DocumentStatusProps) => {
  const dnsFragmentName = "OpenAttestationDnsTxt";
  const dnsFragment = verificationStatus.find((status) => status.name === dnsFragmentName);
  const dnsIdentity = dnsFragment?.data?.every((issuer: { status: string }) => issuer.status === "VALID");

  return (
    <h3 className={`pl-2 mb-0 issuedby`}>
      <span className="mr-1">Issued by</span>
      <span className="domain">
        {dnsIdentity
          ? `${dnsFragment?.data.map((issuer: { location: string }) => issuer.location.toUpperCase()).join(" and ")}`
          : "Unknown"}
      </span>
    </h3>
  );
};

export const DocumentStatus = ({ verificationStatus, className }: DocumentStatusProps) => {
  const positiveFragments = getAllButRevokeFragment(verificationStatus);
  const negativeFragments = [getRevokeFragment(verificationStatus)];
  const hashValid = isValid(positiveFragments, ["DOCUMENT_INTEGRITY"]);
  const issuedValid = isValid(positiveFragments, ["DOCUMENT_STATUS"]) && !certificateNotIssued(positiveFragments);
  const revokedValid = isValid(negativeFragments, ["DOCUMENT_STATUS"]);
  const identityValid = isValid(verificationStatus, ["ISSUER_IDENTITY"]);

  return (
    <section className={`bg-blue-lighter py-3 ${className}`}>
      <div className="container-custom">
        <div className="statusbar">
          <div className="row align-items-center">
            <div className="col-12 col-xl-4 mb-3 mb-xl-0">
              <div className="row align-items-center no-gutters">
                <div className="col-auto">
                  <SvgIcon>
                    <SvgIconCheckCircle />
                  </SvgIcon>
                </div>
                <div className="col">
                  <IssuedBy verificationStatus={verificationStatus} />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-xl-2 mb-2 mb-lg-0">
              <StatusCheck valid={hashValid} messageSet={MESSAGES[TYPES.HASH]} />
            </div>
            <div className="col-12 col-lg-3 col-xl-2 mb-2 mb-lg-0">
              <StatusCheck valid={issuedValid} messageSet={MESSAGES[TYPES.ISSUED]} />
            </div>
            <div className="col-12 col-lg-3 col-xl-2 mb-2 mb-lg-0">
              <StatusCheck valid={revokedValid} messageSet={MESSAGES[TYPES.REVOKED]} />
            </div>
            <div className="col-12 col-lg-3 col-xl-2 mb-2 mb-lg-0">
              <StatusCheck valid={identityValid} messageSet={MESSAGES[TYPES.IDENTITY]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const DocumentStatusDefault = styled(DocumentStatus)`
  .statusbar {
    background-color: ${vars.white};
    padding: 10px;
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
