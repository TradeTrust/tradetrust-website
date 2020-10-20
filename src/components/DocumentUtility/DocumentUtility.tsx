import React from "react";
import styled from "@emotion/styled";
import { getData, WrappedDocument, v2 } from "@govtechsg/open-attestation";
import { mixin, vars } from "../../styles";
import { FeatureFlag } from "../FeatureFlag";
import { SvgIcon, SvgIconQRCode } from "../UI/SvgIcon";
import { Printer, Mail, Download } from "react-feather";
import { ButtonIconWhiteBlue } from "../UI/Button";
import { Popover, OverlayTrigger } from "react-bootstrap";
import QRCode, { ImageSettings } from "qrcode.react";

interface DocumentUtilityProps {
  document: WrappedDocument<v2.OpenAttestationDocument>;
  handleSharingToggle: any;
  onPrint: () => void;
  className?: string;
}

interface DocumentWithAdditionalMetadata extends v2.OpenAttestationDocument {
  name?: string;
  links?: {
    self?: {
      href?: string;
    };
  };
}

export const DocumentUtilityUnStyled = ({
  document,
  handleSharingToggle,
  onPrint,
  className,
}: DocumentUtilityProps) => {
  // Extending document data to account for undefined metadata in OA schema
  const documentWithMetadata = getData<WrappedDocument<DocumentWithAdditionalMetadata>>(document);
  const fileName = documentWithMetadata.name ?? "Untitled";
  const qrcodeUrl = documentWithMetadata.links?.self?.href ?? "";
  const imageSettings: ImageSettings = {
    src: `/static/images/logo-qrcode.png`,
    height: 50,
    width: 55,
    excavate: true,
  };

  const qrCodePopover = (url: string) => (
    <Popover id="qr-code-popover" style={{ borderRadius: 0, border: "1px solid #DDDDDD" }}>
      <Popover.Content data-testid="qr-code-svg" style={{ padding: "10px" }}>
        <QRCode value={url} level="Q" size={200} bgColor="#FFFFFF" fgColor="#000000" imageSettings={imageSettings} />
      </Popover.Content>
    </Popover>
  );

  return (
    <div className={`${className}`}>
      <div className="container-custom">
        <div className="row no-gutters">
          <div className="col-auto ml-auto">
            {qrcodeUrl && (
              <OverlayTrigger trigger="click" placement="bottom-end" overlay={qrCodePopover(qrcodeUrl)}>
                <ButtonIconWhiteBlue aria-label="document-utility-qr-button">
                  <SvgIcon strokeWidth="0.5" fill="currentColor">
                    <SvgIconQRCode />
                  </SvgIcon>
                </ButtonIconWhiteBlue>
              </OverlayTrigger>
            )}
          </div>
          <div className="col-auto ml-3">
            <ButtonIconWhiteBlue aria-label="document-utility-print-button" onClick={() => onPrint()}>
              <Printer />
            </ButtonIconWhiteBlue>
          </div>
          <FeatureFlag name="SHARE_BY_EMAIL">
            <div className="col-auto ml-3">
              <ButtonIconWhiteBlue
                aria-label="document-utility-share-by-email-button"
                onClick={() => handleSharingToggle()}
              >
                <Mail />
              </ButtonIconWhiteBlue>
            </div>
          </FeatureFlag>
          <div className="col-auto ml-3">
            <a
              download={`${fileName}.tt`}
              target="_black"
              href={`data:text/json;,${encodeURIComponent(JSON.stringify(document, null, 2))}`}
            >
              <ButtonIconWhiteBlue aria-label="document-utility-download-document-button">
                <Download />
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
