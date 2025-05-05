import { Button, ProgressBar } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useCallback, useState } from "react";

import ConnectToMetamask from "../../ConnectToMetamask";
import { MultiTabs } from "../../DecentralisedTemplateRenderer/MultiTabs";
import { TabPaneAttachments } from "../../TabPaneAttachments";
import { DecentralisedRendererContainer } from "../../DecentralisedTemplateRenderer/DecentralisedRenderer";
import { TemplateProps } from "@tradetrust-tt/decentralized-renderer-react-components";
import { getAttachments } from "../../../utils/shared";
import { CertificateViewerErrorBoundary } from "../../CertificateViewerErrorBoundary/CertificateViewerErrorBoundary";

const document: any = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/bbs/v1",
    "https://w3id.org/vc/status-list/2021/v1",
    "https://trustvc.io/context/transferable-records-context.json",
    "https://trustvc.io/context/render-method-context.json",
    "https://trustvc.io/context/attachments-context.json",
    "https://schemata.openattestation.com/io/tradetrust/bill-of-lading/1.0/bill-of-lading-context.json",
  ],
  renderMethod: [
    {
      id: "http://localhost:3000",
      type: "EMBEDDED_RENDERER",
      templateName: "BILL_OF_LADING",
    },
  ],
  credentialSubject: {
    shipper: {
      address: {},
    },
    consignee: {},
    notifyParty: {},
    blNumber: "20250107",
    scac: "20250107",
  },
  issuanceDate: "2021-12-03T12:19:52Z",
  expirationDate: "2029-12-03T12:19:52Z",
  issuer: "did:web:trustvc.github.io:did:1",
  type: ["VerifiableCredential"],
};

export const FormPreview: FunctionComponent = () => {
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const attachments = getAttachments(document);
  const hasAttachments = attachments ? attachments.length > 0 : false;

  const updateTemplates = useCallback((templateList: TemplateProps[]) => {
    // filter all templates that are renderable currently
    const templatesModified = templateList.filter((item) => {
      return item.type === "custom-template" || item.type === "application/pdf" || !item.type; // !item.type caters to renderers that still has decentralized-renderer-react-components dependency at <2.3.0, where type does not exists
    });
    console.log("3");
    // set modified templates
    setTemplates(templatesModified);
    setSelectedTemplate(templatesModified[0].id);
  }, []);
  console.log("4");
  return (
    <div className="p-6 gap-2">
      <div className="p-2">
        <h1>Create Document</h1>
      </div>

      <div className="p-2">
        <div className="rounded-lg shadow-md bg-white p-8">
          <div className="flex flex-col flex-start md:flex-row md:justify-between md:items-center">
            <div>
              <h6 className="my-4">Selected Network :</h6>
              <p>Mainnet Network</p>
            </div>
            <div className="my-4">
              <ConnectToMetamask />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-2 gap-6">
        <div className="rounded-lg shadow-md bg-white p-6">
          <div className="p-2">
            <div className="p-2">
              <ProgressBar step={1} totalSteps={3} />
            </div>
            <div className="flex flex-col flex-start md:flex-row md:justify-between md:items-center gap-2.5">
              <div className="p-2 ">
                <h3 data-testid="form-selection-title">Preview Form</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 justify-between items-center md:w-1/2 p-1">
                <div className="p-1  w-full">
                  <Button className="flex-1 w-full bg-white text-cerulean-500 hover:bg-cloud-100 px-[18px]">
                    Previous
                  </Button>
                </div>
                <div className="p-1 w-full">
                  <Button className="flex-1 w-full bg-cerulean-500 text-white hover:bg-cerulean-800">
                    Issue Document
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md bg-white p-4 gap-2">
          <div className="p-2 gap-2">
            <h4>Tradetrust-bill-of-lading.tt</h4>
          </div>
          <div className="p-2">
            <hr />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-1">
            <div className="p-1 gap-2">
              <h4 className="text-cloud-400 font-bold">Owner:</h4>
              <h4 className="font-bold ">Organisation A</h4>
              <div className="inline-block break-all w-full font-semibold text-cloud-500 gap-1">
                <a
                  href="https://amoy.polygonscan.com/address/0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="non-editable-input-owner"
                >
                  <h6>0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638</h6>
                </a>
              </div>
            </div>
            <div className="p-1 gap-2">
              <h4 className="text-cloud-400 font-bold">Holder:</h4>
              <h4 className="font-bold">Organisation A</h4>
              <div className="inline-block break-all w-full font-semibold text-cloud-500">
                <a
                  href="https://amoy.polygonscan.com/address/0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="non-editable-input-owner"
                >
                  <h6>0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638</h6>
                </a>
              </div>
            </div>
            <div className="md:w-1/3 p-1 gap-2">
              <h4 className="text-cloud-400 font-bold">Remarks:</h4>
              <h6>
                Lorem ipsum dolor sit amet consectetur. Dolor aliquam imperdiet turpis leo feugiat sit risus blandit
                viverra scelerisque.
              </h6>
            </div>
          </div>
        </div>
        <div>
          <div className="no-print mt-4">
            <MultiTabs
              hasAttachments={hasAttachments}
              attachments={attachments}
              templates={templates}
              setSelectedTemplate={setSelectedTemplate}
              selectedTemplate={selectedTemplate}
            />
          </div>
          <div id="preview-block" className="bg-white py-6">
            {attachments && (
              <div className={`${selectedTemplate !== "attachmentTab" ? "hidden" : "block"}`}>
                <TabPaneAttachments attachments={attachments} />
              </div>
            )}
            <div className={`${selectedTemplate === "attachmentTab" ? "hidden" : "block"}`}>
              <CertificateViewerErrorBoundary>
                <DecentralisedRendererContainer
                  rawDocument={document}
                  updateTemplates={updateTemplates}
                  selectedTemplate={selectedTemplate}
                  ref={() => {}}
                  isFormPreview={true}
                />
              </CertificateViewerErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
