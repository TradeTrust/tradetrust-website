import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { ErrorBoundary } from "./ErrorBoundary";
import CertificateSharingForm from "./CertificateSharing/CertificateSharingForm";
import { getTokenRegistryAddress } from "../common/utils/document";
import { DecentralisedRendererContainer } from "./DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiTabs } from "./DecentralisedTemplateRenderer/MultiTabs";
import { DocumentStatus } from "./DocumentStatus";
import { DocumentUtility } from "./DocumentUtility";
import { AssetManagementContainer } from "./AssetManagementPanel/AssetManagementContainer";

export const CertificateViewer = (props) => {
  const { document } = props;
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const updateTemplates = useCallback((templates) => {
    setTemplates(templates);
    setSelectedTemplate(templates[0].id);
  }, []);

  const validCertificateContent = (
    <>
      <section className="bg-blue-lighter no-print">
        <DocumentStatus verificationStatus={props.verificationStatus} />
        {tokenRegistryAddress && <AssetManagementContainer document={document} />}
        <MultiTabs
          templates={templates}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={(selectedTemplate) => setSelectedTemplate(selectedTemplate)}
          tokenRegistryAddress={tokenRegistryAddress}
        />
      </section>
      <section>
        <DocumentUtility className="no-print" document={document} handleSharingToggle={props.handleSharingToggle} />
        <div className="bg-white py-3">
          <DecentralisedRendererContainer rawDocument={document} updateTemplates={updateTemplates} />
        </div>
      </section>
      <Modal show={props.showSharing} toggle={props.handleSharingToggle}>
        <CertificateSharingForm
          emailSendingState={props.emailSendingState}
          handleSendCertificate={props.handleSendCertificate}
          handleSharingToggle={props.handleSharingToggle}
        />
      </Modal>
    </>
  );

  return <ErrorBoundary>{validCertificateContent} </ErrorBoundary>;
};

CertificateViewer.propTypes = {
  detailedVerifyVisible: PropTypes.bool,
  document: PropTypes.object,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,
  verificationStatus: PropTypes.array,
  showSharing: PropTypes.bool,
  emailSendingState: PropTypes.string,
  handleSharingToggle: PropTypes.func,
  handleSendCertificate: PropTypes.func,
  selectTemplateTab: PropTypes.func,
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};
