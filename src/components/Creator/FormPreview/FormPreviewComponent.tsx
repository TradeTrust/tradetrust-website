import {
  RawVerifiableCredential,
  SignedVerifiableCredential,
  WrappedOrSignedOpenAttestationDocument,
} from "@trustvc/trustvc";
import React, { FunctionComponent, useCallback, useState } from "react";
import { TemplateProps } from "../../../types";
import { getAttachments } from "../../../utils/shared";
import { CertificateViewerErrorBoundary } from "../../CertificateViewerErrorBoundary/CertificateViewerErrorBoundary";
import { DecentralisedRendererContainer } from "../../DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiTabs } from "../../DecentralisedTemplateRenderer/MultiTabs";
import { TabPaneAttachments } from "../../TabPaneAttachments";
interface DecentralisedRendererProps {
  document: WrappedOrSignedOpenAttestationDocument | SignedVerifiableCredential | RawVerifiableCredential;
}
export const FormPreviewComponent: FunctionComponent<DecentralisedRendererProps> = ({ document }) => {
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
    if (templatesModified?.length > 0 && templatesModified?.[0]?.id) {
      setSelectedTemplate(templatesModified[0].id);
    }
  }, []);

  return (
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
      <div id="preview-block" className="rounded-xl border border-cloud-100 bg-white py-6">
        {hasAttachments && (
          <div className={`${selectedTemplate !== "attachmentTab" ? "hidden" : "block"}`}>
            <TabPaneAttachments attachments={attachments!} />
          </div>
        )}
        <div className={`${selectedTemplate === "attachmentTab" ? "hidden" : "block"}`}>
          <CertificateViewerErrorBoundary>
            <DecentralisedRendererContainer
              rawDocument={document as any}
              updateTemplates={updateTemplates}
              selectedTemplate={selectedTemplate}
              isFormPreview={true}
            />
          </CertificateViewerErrorBoundary>
        </div>
      </div>
    </div>
  );
};
