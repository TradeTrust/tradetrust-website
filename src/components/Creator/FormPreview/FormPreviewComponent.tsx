import React, { FunctionComponent, useCallback, useState } from "react";
import { MultiTabs } from "../../DecentralisedTemplateRenderer/MultiTabs";
import { TabPaneAttachments } from "../../TabPaneAttachments";
import { DecentralisedRendererContainer } from "../../DecentralisedTemplateRenderer/DecentralisedRenderer";
import { CertificateViewerErrorBoundary } from "../../CertificateViewerErrorBoundary/CertificateViewerErrorBoundary";
import { TemplateProps } from "../../../types";
import { getAttachments } from "../../../utils/shared";
import { WrappedOrSignedOpenAttestationDocument } from "@trustvc/trustvc";
interface DecentralisedRendererProps {
  document: WrappedOrSignedOpenAttestationDocument;
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
    setSelectedTemplate(templatesModified[0].id);
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
        {attachments && (
          <div className={`${selectedTemplate !== "attachmentTab" ? "hidden" : "block"}`}>
            <TabPaneAttachments attachments={attachments} />
          </div>
        )}
        <div className={`${selectedTemplate === "attachmentTab" ? "hidden" : "block"}`}>
          <CertificateViewerErrorBoundary>
            <DecentralisedRendererContainer
              rawDocument={document}
              updateTemplates={updateTemplates}
              selectedTemplate={selectedTemplate}
              ref={() => {}}
              isFormPreview={true}
            />
          </CertificateViewerErrorBoundary>
        </div>
      </div>
    </div>
  );
};
