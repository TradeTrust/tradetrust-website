import React from "react";
import styled from "@emotion/styled";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import { mixin, vars } from "../../styles";
import { FeatureFlag } from "../FeatureFlag";
import { SvgIcon, SvgIconPrinter, SvgIconEmail, SvgIconDownload } from "../UI/SvgIcon";
import { ButtonIconWhiteBlue } from "../UI/Button";

interface DocumentUtilityProps {
  document: WrappedDocument;
  handleSharingToggle: any;
  className?: string;
}

export const DocumentUtilityUnStyled = ({ document, handleSharingToggle, className }: DocumentUtilityProps) => {
  const fileName = getData(document).name;

  return (
    <div className={`${className}`}>
      <div className="container-custom">
        <div className="row no-gutters">
          <div className="col-auto ml-auto">
            <ButtonIconWhiteBlue onClick={() => window.print()}>
              <SvgIcon>
                <SvgIconPrinter />
              </SvgIcon>
            </ButtonIconWhiteBlue>
          </div>
          <FeatureFlag name="SHARE_BY_EMAIL">
            <div className="col-auto ml-3">
              <ButtonIconWhiteBlue onClick={() => handleSharingToggle()}>
                <SvgIcon>
                  <SvgIconEmail />
                </SvgIcon>
              </ButtonIconWhiteBlue>
            </div>
          </FeatureFlag>
          <div className="col-auto ml-3">
            <a
              download={`${fileName}.tt`}
              target="_black"
              href={`data:text/plain;,${encodeURIComponent(JSON.stringify(document, null, 2))}`}
            >
              <ButtonIconWhiteBlue>
                <SvgIcon>
                  <SvgIconDownload />
                </SvgIcon>
              </ButtonIconWhiteBlue>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DocumentUtility = styled(DocumentUtilityUnStyled)`
  background-color: ${vars.white};
  padding: 30px 0;

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
