import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./certificateViewer.scss";
import Modal from "./Modal";
import { ErrorBoundary } from "./ErrorBoundary";
import { isEmailFeatureActive } from "../config/feature-config";
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
import { DocumentStatusDefault } from "./DocumentStatus";

const renderHeaderBlock = (props) => {
  return (
    <div className="container-custom">
      <div className="row no-gutters align-items-center">
        <div className="col-12 col-md-auto">
          <div className="my-3 my-md-0 px-md-4 text-center">
            <AssetInfo document={props.document} />
          </div>
        </div>
        <div className="col-12 col-md-auto ml-auto">
          <div className="row no-gutters flex-nowrap justify-content-center">
            <div className="">
              <div id="btn-print" className={styles["print-btn"]} onClick={() => window.print()}>
                <i className="fas fa-print" style={{ fontSize: "1.5rem" }} />
              </div>
            </div>
            {isEmailFeatureActive && (
              <div className="ml-2" onClick={() => props.handleSharingToggle()}>
                <div id="btn-email" className={styles["send-btn"]}>
                  <i className="fas fa-envelope" style={{ fontSize: "1.5rem" }} />
                </div>
              </div>
            )}
            <div className="ml-2">
              <a
                download={`${props.certificate.id}.tt`}
                target="_black"
                href={`data:text/plain;,${encodeURIComponent(JSON.stringify(props.document, null, 2))}`}
              >
                <button id="btn-download" className={styles["send-btn"]} title="Download">
                  <i className="fas fa-file-download" style={{ fontSize: "1.5rem" }} />
                </button>
              </a>
            </div>
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
      <DocumentStatusDefault verificationStatus={props.verificationStatus} />
      {tokenRegistryAddress && (
        <TitleTransferPanel tokenRegistryAddress={tokenRegistryAddress} tokenId={getDocumentId(document)} />
      )}
      <section id={styles["top-header-ui"]}>{renderedHeaderBlock}</section>
      <MultiTabs
        templates={templates}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={(selectedTemplate) => setSelectedTemplate(selectedTemplate)}
        isOverlayVisible={isOverlayVisible}
        setOverlayVisible={setOverlayVisible}
        tokenRegistryAddress={tokenRegistryAddress}
      />
      <DecentralisedRendererContainer rawDocument={document} updateTemplates={updateTemplates} />
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
