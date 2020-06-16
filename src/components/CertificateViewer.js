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
import { getData } from "@govtechsg/open-attestation";
import { Tab } from "react-bootstrap";
import { AttachmentLink } from "./UI/AttachmentLink";

export const CertificateViewer = (props) => {
  const { document } = props;
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const [, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const originalData = getData(document);
  const attachments = originalData?.attachments;

  const updateTemplates = useCallback((templates) => {
    setTemplates(templates);
    setSelectedTemplate(templates[0].id);
  }, []);

  const validCertificateContent = (
    <Tab.Container defaultActiveKey="tab-document">
      <div className="bg-blue-lighter no-print">
        <DocumentStatus verificationStatus={props.verificationStatus} />
        {tokenRegistryAddress && <AssetManagementContainer document={document} />}
        <MultiTabs tokenRegistryAddress={tokenRegistryAddress} attachments={attachments} />
      </div>
      <div className="bg-white">
        <Tab.Content className="py-4">
          <Tab.Pane eventKey="tab-document">
            <DocumentUtility className="no-print" document={document} handleSharingToggle={props.handleSharingToggle} />
            <DecentralisedRendererContainer
              rawDocument={document}
              updateTemplates={updateTemplates}
              selectedTemplate={selectedTemplate}
            />
          </Tab.Pane>
          {attachments && (
            <Tab.Pane eventKey="tab-attachments">
              <div className="container-custom">
                <div className="row">
                  {attachments.map(({ filename, data }) => (
                    <div className="col-6 col-lg-3 mb-3" key={data}>
                      <AttachmentLink filename={filename} data={data} />
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Pane>
          )}
        </Tab.Content>
      </div>
      <Modal show={props.showSharing} toggle={props.handleSharingToggle}>
        <CertificateSharingForm
          emailSendingState={props.emailSendingState}
          handleSendCertificate={props.handleSendCertificate}
          handleSharingToggle={props.handleSharingToggle}
        />
      </Modal>
    </Tab.Container>
  );

  return <ErrorBoundary>{validCertificateContent}</ErrorBoundary>;
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
