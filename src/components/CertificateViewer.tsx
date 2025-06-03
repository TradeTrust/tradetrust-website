import { getTokenId, getTokenRegistryAddress, isTransferableRecord } from "@trustvc/trustvc";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProviderContext } from "../common/contexts/provider";
import { useTokenInformationContext } from "../common/contexts/TokenInformationContext";
import { RootState } from "../reducers";
import { resetCertificateState, updateCertificate, updateFilename } from "../reducers/certificate";
import { resetDemoState } from "../reducers/demo-verify";
import { TemplateProps } from "../types";
import { getLogger } from "../utils/logger";
import { getAttachments, getKeyId, WrappedOrSignedOpenAttestationDocument } from "../utils/shared";
import { AssetManagementApplication } from "./AssetManagementPanel/AssetManagementApplication";
import { CertificateViewerErrorBoundary } from "./CertificateViewerErrorBoundary/CertificateViewerErrorBoundary";
import { DecentralisedRendererContainer } from "./DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiTabs } from "./DecentralisedTemplateRenderer/MultiTabs";
import { DocumentUtility } from "./DocumentUtility";
import { EndorsementChainContainer } from "./EndorsementChain";
import { ObfuscatedMessage } from "./ObfuscatedMessage";
import ScrollTip from "./ScrollTip";
import { TabPaneAttachments } from "./TabPaneAttachments";

const { trace } = getLogger("component: certificateviewer");

interface CertificateViewerProps {
  isMagicDemo?: boolean;
  document: WrappedOrSignedOpenAttestationDocument;
  filename: string;
}

export const CertificateViewer: FunctionComponent<CertificateViewerProps> = ({ isMagicDemo, document, filename }) => {
  const isTransferableAssetVal = isTransferableRecord(document);
  let tokenId = "";
  if (isTransferableAssetVal) {
    try {
      tokenId = getTokenId(document);
    } catch (e) {
      trace(e);
    }
  }

  const tokenRegistryAddress = isTransferableAssetVal ? getTokenRegistryAddress(document) : "";
  const keyId = getKeyId(document);
  const isTransferableDocument = !!tokenRegistryAddress;
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showEndorsementChain, setShowEndorsementChain] = useState(false);
  const attachments = getAttachments(document);
  const hasAttachments = attachments ? attachments.length > 0 : false;
  const { initialize, resetStates: resetTokenInformationState } = useTokenInformationContext();
  const dispatch = useDispatch();

  const isSampleDocument = useSelector((state: RootState) => state.sample.isSampleDocument);
  const certificateDoc = useSelector((state: RootState) => state.certificate.rawModified);

  const resetCertificateData = useCallback(() => {
    dispatch(resetCertificateState());
    dispatch(resetDemoState());
    // Bypass filename update error
    dispatch(updateFilename(filename));
  }, [dispatch, filename]);

  const { currentChainId } = useProviderContext();

  /*  Update the certificate when network is changed UNLESS:
  - it is Magic Demo certificate, as the network does not change for it (fixed at Sepolia).
  - it is Sample certificate, as it is already updated when user changed network from network selector dropdown provided by website UI (not the metamask extension network selector)
   */
  useEffect(() => {
    if (isMagicDemo || isSampleDocument) return;
    resetCertificateData();
    dispatch(updateCertificate(certificateDoc));
  }, [certificateDoc, currentChainId, dispatch, resetCertificateData, isMagicDemo, isSampleDocument]);

  /*
  initialise the meta token information context when new tokenId
  and tokenRegistryAddress provided and clean up the context when certificate viewer unmounts
  */
  useEffect(() => {
    if (tokenRegistryAddress) {
      trace("initialise token information context");
      initialize(tokenRegistryAddress, tokenId);
    }
    return () => {
      trace("resetting token information on unmount");
      resetTokenInformationState();
      resetCertificateData();
    };
  }, [tokenId, tokenRegistryAddress, initialize, resetTokenInformationState, resetCertificateData]);

  const childRef = React.useRef<{ print: () => void }>();

  const updateTemplates = useCallback((templateList: TemplateProps[]) => {
    // filter all templates that are renderable currently
    const templatesModified = templateList.filter((item) => {
      return item.type === "custom-template" || item.type === "application/pdf" || !item.type; // !item.type caters to renderers that still has decentralized-renderer-react-components dependency at <2.3.0, where type does not exists
    });

    // set modified templates
    setTemplates(templatesModified);
    setSelectedTemplate(templatesModified[0].id);
  }, []);

  const onPrint = () => {
    if (childRef.current) {
      childRef.current.print();
    }
  };
  const renderedEndorsementChain = (
    <div className="bg-cerulean-50 no-print">
      <ObfuscatedMessage document={document} />
      {isTransferableDocument && (
        <EndorsementChainContainer
          tokenId={tokenId}
          keyId={keyId}
          tokenRegistry={tokenRegistryAddress}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      )}
    </div>
  );

  const renderedCertificateViewer = (
    <>
      <div className="no-print mt-4">
        {!isTransferableDocument && (
          <AssetManagementApplication
            isMagicDemo={isMagicDemo}
            isTransferableDocument={isTransferableDocument}
            isSampleDocument={isSampleDocument}
          />
        )}
        <ObfuscatedMessage document={document} />
        {isTransferableDocument && (
          <AssetManagementApplication
            isMagicDemo={isMagicDemo}
            tokenId={tokenId}
            tokenRegistryAddress={tokenRegistryAddress}
            setShowEndorsementChain={setShowEndorsementChain}
            keyId={keyId}
            isTransferableDocument={isTransferableDocument}
            isSampleDocument={isSampleDocument}
          />
        )}
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
            {templates.length > 0 && (
              <DocumentUtility document={document} onPrint={onPrint} selectedTemplate={selectedTemplate} />
            )}
            <DecentralisedRendererContainer
              rawDocument={document}
              updateTemplates={updateTemplates}
              selectedTemplate={selectedTemplate}
              ref={childRef}
            />
          </div>
        </div>
      </div>

      <ScrollTip targetId="preview-block" />
    </>
  );

  return (
    <CertificateViewerErrorBoundary>
      {showEndorsementChain ? renderedEndorsementChain : renderedCertificateViewer}
    </CertificateViewerErrorBoundary>
  );
};
