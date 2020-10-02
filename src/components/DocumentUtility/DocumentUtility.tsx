import React, { useState } from "react";
import styled from "@emotion/styled";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import { mixin, vars } from "../../styles";
import { FeatureFlag } from "../FeatureFlag";
import { SvgIcon, SvgIconQRCode } from "../UI/SvgIcon";
import { Printer, Mail, Download } from "react-feather";
import { ButtonIconWhiteBlue } from "../UI/Button";
import { Popover, OverlayTrigger } from "react-bootstrap";
import QRCode, { ImageSettings } from "qrcode.react";
import { getDimensions } from "./../../common/utils/logo";

interface DocumentUtilityProps {
  document: WrappedDocument;
  handleSharingToggle: any;
  onPrint: () => void;
  className?: string;
}

export const DocumentUtilityUnStyled = ({
  document,
  handleSharingToggle,
  onPrint,
  className,
}: DocumentUtilityProps) => {
  const fileName = getData(document).name;
  const qrcodeUrl = getData(document)?.links?.self?.href ?? "";
  const logoUrl = getData(document)?.logo;
  const [imageSettings, setImageSettings] = useState<ImageSettings>();

  if (logoUrl) {
    const img: HTMLImageElement = new Image();
    img.src = logoUrl;
    img.onload = () => {
      const logoSize = getDimensions({ width: img.width, height: img.height, maxWidth: 100, maxHeight: 100 });

      setImageSettings({
        src: logoUrl,
        x: undefined,
        y: undefined,
        height: Math.round(logoSize.height),
        width: Math.round(logoSize.width),
        excavate: true,
      });
    };
  }
  const qrCodePopover = (url: string) => (
    <Popover id="qr-code-popover" style={{ borderRadius: 0, border: "1px solid #DDDDDD" }}>
      <Popover.Content style={{ padding: "10px" }}>
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
