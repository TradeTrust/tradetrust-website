import styled from "@emotion/styled";
import { getData, v2, WrappedDocument } from "@govtechsg/open-attestation";
import { ButtonIcon } from "@govtechsg/tradetrust-ui-components";
import QRCode, { ImageSettings } from "qrcode.react";
import React, { useState } from "react";
import { Download, Mail, Printer } from "react-feather";
import { mixin, vars } from "../../styles";
import { FeatureFlag } from "../FeatureFlag";
import { SvgIcon, SvgIconQRCode } from "../UI/SvgIcon";

interface DocumentUtilityProps {
  document: WrappedDocument<v2.OpenAttestationDocument>;
  handleSharingToggle: any;
  onPrint: () => void;
}

interface DocumentWithAdditionalMetadata extends v2.OpenAttestationDocument {
  name?: string;
  links?: {
    self?: {
      href?: string;
    };
  };
}

export const DocumentUtility = ({ document, handleSharingToggle, onPrint }: DocumentUtilityProps) => {
  const [qrCodePopover, setQrCodePopover] = useState(false);
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

  return (
    <DocumentUtilities>
      <div className="container no-print">
        <div className="flex flex-wrap">
          <div className="w-auto ml-auto">
            {qrcodeUrl && (
              <div
                className="relative"
                onClick={() => {
                  setQrCodePopover(!qrCodePopover);
                }}
              >
                <ButtonIcon className="bg-white hover:bg-grey-100" aria-label="document-utility-qr-button">
                  <SvgIcon strokeWidth="0.5" fill="currentColor">
                    <SvgIconQRCode />
                  </SvgIcon>
                </ButtonIcon>
                <div
                  data-testid="qr-code-svg"
                  className={`absolute border p-2 mt-2 top-100 right-0 shadow-md rounded bg-white ${
                    qrCodePopover ? "block" : "hidden"
                  }`}
                >
                  <QRCode
                    value={qrcodeUrl}
                    level="Q"
                    size={200}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    imageSettings={imageSettings}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-auto ml-3">
            <ButtonIcon
              className="bg-white hover:bg-grey-100"
              aria-label="document-utility-print-button"
              onClick={() => onPrint()}
            >
              <Printer />
            </ButtonIcon>
          </div>
          <FeatureFlag name="SHARE_BY_EMAIL">
            <div className="w-auto ml-3">
              <ButtonIcon
                className="bg-white hover:bg-grey-100"
                aria-label="document-utility-share-by-email-button"
                onClick={() => handleSharingToggle()}
              >
                <Mail />
              </ButtonIcon>
            </div>
          </FeatureFlag>
          <div className="w-auto ml-3">
            <a
              download={`${fileName}.tt`}
              target="_black"
              href={`data:text/json;,${encodeURIComponent(JSON.stringify(document, null, 2))}`}
            >
              <ButtonIcon className="bg-white hover:bg-grey-100" aria-label="document-utility-download-document-button">
                <Download />
              </ButtonIcon>
            </a>
          </div>
        </div>
      </div>
    </DocumentUtilities>
  );
};

export const DocumentUtilities = styled.div`
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
