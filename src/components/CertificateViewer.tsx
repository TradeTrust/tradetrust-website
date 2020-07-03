import React, { useCallback, useState } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { VerificationFragment } from "@govtechsg/oa-verify";
import { ErrorBoundary } from "./ErrorBoundary";
import { ModalDialog } from "./ModalDialog";
import CertificateSharingForm from "./CertificateSharing/CertificateSharingForm";
import { getTokenRegistryAddress } from "../common/utils/document";
import { DecentralisedRendererContainer } from "./DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiButtons } from "./MultiButtons";
import { MultiTabs } from "./DecentralisedTemplateRenderer/MultiTabs";
import { DocumentStatus } from "./DocumentStatus";
import { DocumentUtility } from "./DocumentUtility";
import { AssetManagementContainer } from "./AssetManagementPanel/AssetManagementContainer";
import { getData } from "@govtechsg/open-attestation";
import { Tab } from "react-bootstrap";
import { TabPaneAttachments } from "./TabPaneAttachments";
import { TemplateProps } from "./../types";

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
    <Tab.Container defaultActiveKey="tab-document">
      <div className="bg-blue-lighter no-print">
        <DocumentStatus verificationStatus={verificationStatus} />
        {tokenRegistryAddress && <AssetManagementContainer document={document} />}
        <MultiButtons tokenRegistryAddress={tokenRegistryAddress} />
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
      <ModalDialog show={showSharing} toggle={handleSharingToggle}>
        <CertificateSharingForm
          emailSendingState={emailSendingState}
          handleSendCertificate={handleSendCertificate}
          handleSharingToggle={handleSharingToggle}
        />
      </ModalDialog>
    </Tab.Container>
  );

  return <ErrorBoundary>{validCertificateContent}</ErrorBoundary>;
};
