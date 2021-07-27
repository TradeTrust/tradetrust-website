import styled from "@emotion/styled";
import { getData, v2, WrappedDocument } from "@govtechsg/open-attestation";
import { ButtonIcon } from "@govtechsg/tradetrust-ui-components";
import QRCode, { ImageSettings } from "qrcode.react";
import React, { FunctionComponent, useState } from "react";
import { Download, Printer } from "react-feather";
import tw from "twin.macro";
import { SvgIcon, SvgIconQRCode } from "../UI/SvgIcon";

interface DocumentUtilityProps {
  document: WrappedDocument<v2.OpenAttestationDocument>;
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

export const DocumentUtility: FunctionComponent<DocumentUtilityProps> = ({ document, onPrint }) => {
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
                <ButtonIcon
                  className="bg-white border-2 border-cloud-100 rounded-xl hover:bg-gray-100"
                  aria-label="document-utility-qr-button"
                >
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
              className="bg-white border-2 border-cloud-100 rounded-xl hover:bg-gray-100"
              aria-label="document-utility-print-button"
              onClick={() => onPrint()}
            >
              <Printer />
            </ButtonIcon>
          </div>
          <div className="w-auto ml-3">
            <a
              download={`${fileName}.tt`}
              target="_black"
              href={`data:text/json;,${encodeURIComponent(JSON.stringify(document, null, 2))}`}
            >
              <ButtonIcon
                className="bg-white border-2 border-cloud-100 rounded-xl hover:bg-gray-100"
                aria-label="document-utility-download-document-button"
              >
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
  ${tw`bg-white pb-8`}

  .statusbar {
    ${tw`bg-white py-2 rounded`}
  }

  svg {
    ${tw`text-cerulean`}

    .x-circle {
      ${tw`text-red-500`}
    }
  }

  .issuedby {
    ${tw`text-gray-700 text-lg font-semibold`}

    span {
      ${tw`inline-block`}
      word-break: break-all;
    }

    .domain {
      ${tw`text-cerulean-500`}
    }
  }

  .message {
    ${tw`text-sm leading-5`}
  }
`;
