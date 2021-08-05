import { VerificationFragment } from "@govtechsg/oa-verify";
import { getData, utils, v2, WrappedDocument } from "@govtechsg/open-attestation";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTokenInformationContext } from "../common/contexts/TokenInformationContext";
import { resetCertificateState } from "../reducers/certificate";
import { getLogger } from "../utils/logger";
import { TemplateProps } from "./../types";
import { AssetManagementApplication } from "./AssetManagementPanel/AssetManagementApplication";
import { DecentralisedRendererContainer } from "./DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiTabs } from "./DecentralisedTemplateRenderer/MultiTabs";
import { DocumentStatus } from "./DocumentStatus";
import { DocumentUtility } from "./DocumentUtility";
import { EndorsementChainContainer } from "./EndorsementChain";
import { ErrorBoundary } from "./ErrorBoundary";
import { ObfuscatedMessage } from "./ObfuscatedMessage";
import { TabPaneAttachments } from "./TabPaneAttachments";

const { trace } = getLogger("component: certificateviewer");

interface CertificateViewerProps {
  document: WrappedDocument<v2.OpenAttestationDocument>;
  verificationStatus: VerificationFragment[];
}

export const CertificateViewer: FunctionComponent<CertificateViewerProps> = ({ document, verificationStatus }) => {
  const isTransferableAsset = utils.isTransferableAsset(document);
  let tokenId = "";
  if (isTransferableAsset) {
    try {
      tokenId = `0x${utils.getAssetId(document)}`;
    } catch (e) {
      trace(e);
    }
  }
  const tokenRegistryAddress = isTransferableAsset ? utils.getIssuerAddress(document)[0] : "";
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showEndorsementChain, setShowEndorsementChain] = useState(false);
  const originalData = getData(document);
  const attachments = originalData?.attachments;
  const hasAttachments = attachments ? attachments.length > 0 : false;
  const { initialize, resetStates: resetTokenInformationState } = useTokenInformationContext();
  const dispatch = useDispatch();

  const resetCertificateData = useCallback(() => dispatch(resetCertificateState()), [dispatch]);

  /*
  initialise the meta token information context when new tokenId
  and tokenRegistryAddress provided and clean up the context when certificate viewer unmounts
  */
  useEffect(() => {
    if (tokenRegistryAddress) {
      trace("initialise token information context");
      initialize(tokenRegistryAddress, tokenId);
      return () => {
        trace("reseting token information on unmount");
        resetTokenInformationState();
        resetCertificateData();
      };
    }
  }, [tokenId, tokenRegistryAddress, resetCertificateData, resetTokenInformationState, initialize]);

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
      {tokenRegistryAddress && (
        <EndorsementChainContainer
          tokenId={tokenId}
          tokenRegistry={tokenRegistryAddress}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      )}
    </div>
  );

  const renderedCertificateViewer = (
    <>
      <div className="no-print">
        {tokenRegistryAddress ? (
          <AssetManagementApplication
            tokenId={tokenId}
            tokenRegistryAddress={tokenRegistryAddress}
            setShowEndorsementChain={setShowEndorsementChain}
            document={document}
            verificationStatus={verificationStatus}
          />
        ) : (
          <div className="container">
            <DocumentStatus verificationStatus={verificationStatus} />
            <ObfuscatedMessage document={document} />
          </div>
        )}
      </div>

      <div className="no-print mt-16">
        <MultiTabs
          hasAttachments={hasAttachments}
          attachments={attachments}
          templates={templates}
          setSelectedTemplate={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
        />
      </div>
      <div className="bg-white py-6">
        {attachments && (
          <div className={`${selectedTemplate !== "attachmentTab" ? "hidden" : "block"}`}>
            <TabPaneAttachments attachments={attachments} />
          </div>
        )}
        <div className={`${selectedTemplate === "attachmentTab" ? "hidden" : "block"}`}>
          <DocumentUtility document={document} onPrint={onPrint} />
          <DecentralisedRendererContainer
            rawDocument={document}
            updateTemplates={updateTemplates}
            selectedTemplate={selectedTemplate}
            ref={childRef}
          />
        </div>
      </div>
    </>
  );

  return <ErrorBoundary>{showEndorsementChain ? renderedEndorsementChain : renderedCertificateViewer}</ErrorBoundary>;
};
