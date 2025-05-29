import { ButtonIcon } from "../Button";
import { isRawV3Document, v2 } from "@trustvc/trustvc";
import QRCode, { ImageSettings } from "qrcode.react";
import React, { FunctionComponent, useState } from "react";
import { Download, Printer } from "react-feather";
import { WrappedOrSignedOpenAttestationDocument, getOpenAttestationData, getTemplateUrl } from "../../utils/shared";
import { SvgIcon, SvgIconQRCode } from "../UI/SvgIcon";
interface DocumentUtilityProps {
  document: WrappedOrSignedOpenAttestationDocument;
  onPrint: () => void;
  selectedTemplate: string;
}

interface DocumentWithAdditionalMetadata extends v2.OpenAttestationDocument {
  name?: string;
  links?: {
    self?: {
      href?: string;
    };
  };
}

export const DocumentUtility: FunctionComponent<DocumentUtilityProps> = ({ document, onPrint, selectedTemplate }) => {
  const [qrCodePopover, setQrCodePopover] = useState(false);
  const documentWithMetadata = getOpenAttestationData(document) as DocumentWithAdditionalMetadata; // Extending document data to account for undefined metadata in OA schema

  const { name, links } = (isRawV3Document(documentWithMetadata) as any)
    ? documentWithMetadata.credentialSubject
    : documentWithMetadata;
  const fileName = name ?? "Untitled";
  const qrcodeUrl = links?.self?.href;
  const templateURL = getTemplateUrl(document);
  const imageSettings: ImageSettings = {
    src: `/static/images/logo-qrcode.png`,
    height: 50,
    width: 55,
    excavate: true,
  };

  return (
    <div className="container no-print bg-white pb-4">
      <div className="flex flex-wrap items-start gap-4">
        {selectedTemplate !== "default-template" && (
          <div className="flex-1">
            <h4 className="text-base font-semibold mb-1">Rendered View:</h4>
            <h6 className="text-sm break-words">
              {selectedTemplate.trim().toUpperCase()} rendered from{" "}
              <a href={templateURL} className="text-blue-500 underline break-all">
                {templateURL}
              </a>
            </h6>
          </div>
        )}

        <div
          className={`${
            selectedTemplate !== "default-template" ? "" : "w-full"
          } flex justify-end items-start space-x-3 mt-4 sm:mt-0`}
        >
          {qrcodeUrl && (
            <div
              className="relative"
              onClick={() => {
                setQrCodePopover(!qrCodePopover);
              }}
            >
              <ButtonIcon
                className="bg-white border-2 border-cloud-100 rounded-xl hover:bg-cloud-100"
                aria-label="document-utility-qr-button"
              >
                <SvgIcon className="text-cerulean-500" strokeWidth="0.5" fill="currentColor">
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
          <div className="w-auto ml-3">
            <ButtonIcon
              className="bg-white text-cerulean-500 border-2 border-cloud-100 rounded-xl hover:bg-cloud-100"
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
              role="button"
              aria-label="document-utility-download"
            >
              <ButtonIcon className="bg-white text-cerulean-500 border-2 border-cloud-100 rounded-xl hover:bg-cloud-100">
                <Download />
              </ButtonIcon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
