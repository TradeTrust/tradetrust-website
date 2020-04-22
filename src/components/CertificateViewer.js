import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { ErrorBoundary } from "./ErrorBoundary";
import CertificateSharingForm from "./CertificateSharing/CertificateSharingForm";
import { AssetInfo } from "./AssetInfo";
import { TitleTransferPanel } from "./TitleTransferPanel";
import { getDocumentId, getTokenRegistryAddress } from "../common/utils/document";
import { OverlayAddressBook } from "./UI/Overlay";
import { useAddressBook } from "../common/hooks/useAddressBook";
import { CSSTransition } from "react-transition-group";
import { DecentralisedRendererContainer } from "./DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiTabs } from "./DecentralisedTemplateRenderer/MultiTabs";
import { useKeyPress } from "./../common/hooks/useKeyPress";
import { DocumentStatus } from "./DocumentStatus";
import { DocumentUtility } from "./DocumentUtility";

const renderHeaderBlock = (props) => {
  return (
    <div className="container-custom">
      <div className="row no-gutters align-items-center">
        <div className="col-12 col-md-auto">
          <div className="my-3 my-md-0 px-md-4 text-center">
            <AssetInfo document={props.document} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CertificateViewer = (props) => {
  const { document } = props;
  const renderedHeaderBlock = renderHeaderBlock(props);
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const { addressBook } = useAddressBook();
  const escapePress = useKeyPress("Escape");

  useEffect(() => {
    if (escapePress) {
      setOverlayVisible(false);
    }
  }, [escapePress]);

  const updateTemplates = useCallback((templates) => {
    setTemplates(templates);
    setSelectedTemplate(templates[0].id);
  }, []);

  const validCertificateContent = (
    <>
      <CSSTransition
        in={isOverlayVisible}
        timeout={400}
        classNames="fade"
        unmountOnExit
        onEnter={() => setOverlayVisible(true)}
        onExited={() => setOverlayVisible(false)}
      >
        <OverlayAddressBook
          id="overlay-addressbook"
          title="Address Book"
          isOverlayVisible={isOverlayVisible}
          handleCloseOverlay={() => {
            setOverlayVisible(!isOverlayVisible);
          }}
          addressBook={addressBook}
        />
      </CSSTransition>
      <section className="bg-blue-lighter no-print">
        <DocumentStatus verificationStatus={props.verificationStatus} />
        {tokenRegistryAddress && (
          <TitleTransferPanel tokenRegistryAddress={tokenRegistryAddress} tokenId={getDocumentId(document)} />
        )}
        <div className="py-4">{renderedHeaderBlock}</div>
        <MultiTabs
          templates={templates}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={(selectedTemplate) => setSelectedTemplate(selectedTemplate)}
          isOverlayVisible={isOverlayVisible}
          setOverlayVisible={setOverlayVisible}
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
