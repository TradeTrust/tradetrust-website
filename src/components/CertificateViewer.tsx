import { VerificationFragment } from "@govtechsg/oa-verify";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import { defaultsDeep } from "lodash";
import React, { useCallback, useState } from "react";
import { Tab } from "react-bootstrap";
import { getTokenRegistryAddress } from "../common/utils/document";
import { NETWORK_NAME } from "../config";
import { encodeQrCodeFromStorage } from "../services/qrProcessor";
import { TemplateProps } from "./../types";
import { AssetManagementContainer } from "./AssetManagementPanel/AssetManagementContainer";
import CertificateSharingForm from "./CertificateSharing/CertificateSharingForm";
import { DecentralisedRendererContainer } from "./DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiTabs } from "./DecentralisedTemplateRenderer/MultiTabs";
import { DocumentStatus } from "./DocumentStatus";
import { DocumentUtility } from "./DocumentUtility";
import { ErrorBoundary } from "./ErrorBoundary";
import { ModalDialog } from "./ModalDialog";
import { MultiButtons } from "./MultiButtons";
import { TabPaneAttachments } from "./TabPaneAttachments";

interface CertificateViewerProps {
  document: WrappedDocument;
  verificationStatus: VerificationFragment[];
  shareLink: { id?: string; key?: string };
  showSharing: boolean;
  emailSendingState: string;
  handleSharingToggle: () => void;
  handleSendCertificate: (event: { email: string; captcha: string }) => void;
}

export const CertificateViewer = ({
  document,
  verificationStatus,
  handleSharingToggle,
  showSharing,
  emailSendingState,
  handleSendCertificate,
}: CertificateViewerProps) => {
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const originalData = getData(document);
  const attachments = originalData?.attachments;
  const hasAttachments = attachments && attachments.length > 0;

  const qrURL = () => {
    const fileQueueNumber = originalData?.queueNumber || "";
    if (!fileQueueNumber) return "";

    const qrURLObj = {
      type: "DOCUMENT",
      payload: {
        uri: `https://api${NETWORK_NAME === "homestead" ? "" : `-${NETWORK_NAME}`}.tradetrust.io/storage/${
          fileQueueNumber.id
        }`,
        key: fileQueueNumber.key,
        permittedActions: ["STORE"],
        redirect: `https://${NETWORK_NAME === "homestead" ? "" : "dev."}tradetrust.io/`,
      },
    };

    return encodeQrCodeFromStorage(qrURLObj);
  };

  const qrCode = {
    data: {
      links: {
        self: {
          href: qrURL(),
        },
      },
    },
  };

  defaultsDeep(document, qrCode);

  const updateTemplates = useCallback((templates: TemplateProps[]) => {
    // filter all templates that are renderable currently
    const templatesModified = templates.filter((item) => {
      return item.type === "custom-template" || item.type === "application/pdf" || !item.type; // !item.type caters to renderers that still has decentralized-renderer-react-components dependency at <2.3.0, where type does not exists
    });

    // set modified templates
    setTemplates(templatesModified);
    setSelectedTemplate(templatesModified[0].id);
  }, []);

  const validCertificateContent = (
    <>
      <div className="bg-blue-lighter no-print">
        <DocumentStatus verificationStatus={verificationStatus} />
        {tokenRegistryAddress && <AssetManagementContainer document={document} />}
        <MultiButtons tokenRegistryAddress={tokenRegistryAddress} />
      </div>
      <Tab.Container defaultActiveKey="tab-document">
        <div className="bg-blue-lighter no-print">
          <MultiTabs
            hasAttachments={hasAttachments}
            attachments={attachments}
            templates={templates}
            setSelectedTemplate={setSelectedTemplate}
            selectedTemplate={selectedTemplate}
          />
        </div>
        <div className="bg-white">
          <Tab.Content className="py-4">
            <Tab.Pane eventKey="tab-document">
              <DocumentUtility className="no-print" document={document} handleSharingToggle={handleSharingToggle} />
              <DecentralisedRendererContainer
                rawDocument={document}
                updateTemplates={updateTemplates}
                selectedTemplate={selectedTemplate}
              />
            </Tab.Pane>
            {hasAttachments && <TabPaneAttachments attachments={attachments} />}
          </Tab.Content>
        </div>
      </Tab.Container>
      <ModalDialog show={showSharing} toggle={handleSharingToggle}>
        <CertificateSharingForm
          emailSendingState={emailSendingState}
          handleSendCertificate={handleSendCertificate}
          handleSharingToggle={handleSharingToggle}
        />
      </ModalDialog>
    </>
  );

  return <ErrorBoundary>{validCertificateContent}</ErrorBoundary>;
};
