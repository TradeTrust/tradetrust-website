import { VerificationFragment } from "@govtechsg/oa-verify";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import React, { useCallback, useState } from "react";
import { Tab } from "react-bootstrap";
import { getDocumentId, getTokenRegistryAddress } from "../common/utils/document";
import { TemplateProps } from "./../types";
import { AssetManagementApplication } from "./AssetManagementPanel/AssetManagementApplication";
import CertificateSharingForm from "./CertificateSharing/CertificateSharingForm";
import { DecentralisedRendererContainer } from "./DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiTabs } from "./DecentralisedTemplateRenderer/MultiTabs";
import { DocumentStatus } from "./DocumentStatus";
import { DocumentUtility } from "./DocumentUtility";
import { EndorsementChainContainer } from "./EndorsementChain/EndorsementChainContainer";
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
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showEndorsementChain, setShowEndorsementChain] = useState(false);
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

  const renderedEndorsementChain = (
    <div className="bg-blue-lighter no-print">
      <DocumentStatus verificationStatus={verificationStatus} />
      <EndorsementChainContainer
        tokenId={tokenId}
        tokenRegistry={tokenRegistryAddress}
        setShowEndorsementChain={setShowEndorsementChain}
      />
    </div>
  );

  const renderedCertificateViewer = (
    <>
      <div className="bg-blue-lighter no-print">
        <DocumentStatus verificationStatus={verificationStatus} />
        {tokenRegistryAddress && (
          <AssetManagementApplication
            tokenId={tokenId}
            tokenRegistryAddress={tokenRegistryAddress}
            setShowEndorsementChain={setShowEndorsementChain}
          />
        )}
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

  return <ErrorBoundary>{showEndorsementChain ? renderedEndorsementChain : renderedCertificateViewer}</ErrorBoundary>;
};
