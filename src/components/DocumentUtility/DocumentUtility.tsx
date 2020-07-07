import React from "react";
import styled from "@emotion/styled";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import { mixin, vars } from "../../styles";
import { FeatureFlag } from "../FeatureFlag";
import { SvgIcon, SvgIconPrinter, SvgIconEmail, SvgIconDownload, SvgIconQRCode } from "../UI/SvgIcon";
import { ButtonIconWhiteBlue } from "../UI/Button";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { QRCode } from "react-qr-svg";

interface DocumentUtilityProps {
  document: WrappedDocument;
  handleSharingToggle: any;
  className?: string;
}

export const DocumentUtilityUnStyled = ({ document, handleSharingToggle, className }: DocumentUtilityProps) => {
  const fileName = getData(document).name;

  const qrCodePopover = (
    <Popover id="qr-code-popover" style={{ borderRadius: 0, border: "1px solid #DDDDDD" }}>
      <Popover.Content style={{padding:0}}>
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ width: 150, padding: "10px" }}
          value="some textsome textsome textsome textsome"
        />
      </Popover.Content>
    </Popover>
  );

  return (
    <div className={`${className}`}>
      <div className="container-custom">
        <div className="row no-gutters">
          <div className="col-auto ml-auto">
            <OverlayTrigger trigger="click" placement="bottom-end" overlay={qrCodePopover}>
              <ButtonIconWhiteBlue>
                <SvgIcon strokeWidth="0.5" fill="currentColor">
                  <SvgIconQRCode />
                </SvgIcon>
              </ButtonIconWhiteBlue>
            </OverlayTrigger>
          </div>
          <div className="col-auto ml-3">
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
  padding-bottom: 30px;

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
