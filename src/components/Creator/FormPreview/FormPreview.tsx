import React, { FunctionComponent, useCallback, useState } from "react";
import ConnectToMetamask from "../../ConnectToMetamask";
import { MultiTabs } from "../../DecentralisedTemplateRenderer/MultiTabs";
import { TabPaneAttachments } from "../../TabPaneAttachments";
import { DecentralisedRendererContainer } from "../../DecentralisedTemplateRenderer/DecentralisedRenderer";
import { getAttachments } from "../../../utils/shared";
import { CertificateViewerErrorBoundary } from "../../CertificateViewerErrorBoundary/CertificateViewerErrorBoundary";
import { TemplateProps } from "../../../types";
import { AssetInformationPanel } from "./assetInformationPanel";
import { ProgressPanel } from "./ProgressPanel";

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
      id: "https://generic-templates.tradetrust.io",
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
    // set modified templates
    setTemplates(templatesModified);
    setSelectedTemplate(templatesModified[0].id);
  }, []);
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
          <ProgressPanel />
        </div>
        <div className="rounded-lg shadow-md bg-white p-4 gap-2">
          <AssetInformationPanel />
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
