import React, { FunctionComponent, useCallback, useMemo, useRef, useState } from "react";
import { TemplateProps } from "../../types";
import { getAttachments } from "../../utils/shared";
import { isValidAttachmentData } from "../../utils/attachmentValidation";
import { DecentralisedRenderer } from "../DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiTabs } from "../DecentralisedTemplateRenderer/MultiTabs";
import { DocumentUtility } from "../DocumentUtility";
import { InvalidAttachmentsBanner } from "../InvalidAttachmentsBanner";
import { TabPaneAttachments } from "../TabPaneAttachments";

interface CredentialDocumentViewProps {
  /** One credential lifted out of a presentation. */
  credential: any;
  /** Download name for this credential, unique across the presentation's tabs. */
  downloadName: string;
}

/**
 * Renders a single credential from a presentation: its own template tabs, attachments and
 * utility bar, the same way the certificate viewer renders a standalone document.
 *
 * It deliberately does NOT use `DecentralisedRendererContainer`. That container is connected to
 * the certificate slice and dispatches `applyPrivacyFilter` on an OBFUSCATE message from the
 * frame, which would obfuscate the whole presentation held in the store rather than this
 * credential — and `obfuscateDocument` throws on a presentation anyway. Obfuscating a
 * credential that has already been presented is not a supported action, so the message is
 * dropped instead.
 */
export const CredentialDocumentView: FunctionComponent<CredentialDocumentViewProps> = ({
  credential,
  downloadName,
}) => {
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const childRef = useRef<{ print: () => void }>();

  const attachments = useMemo(() => getAttachments(credential), [credential]);
  const hasAttachments = attachments ? attachments.length > 0 : false;

  const invalidAttachments = useMemo(() => {
    const filtered = attachments?.filter(
      (attachment) => attachment.type === "custom-template" || attachment.type === "application/pdf" || !attachment.type
    );
    return (
      filtered
        ?.map((attachment, index) => ({
          ...attachment,
          index,
          isInvalid:
            typeof attachment.data === "string" ? !isValidAttachmentData(attachment.data, attachment.type) : false,
        }))
        .filter((attachment) => attachment.isInvalid) || []
    );
  }, [attachments]);

  const updateTemplates = useCallback((templateList: TemplateProps[]) => {
    // filter all templates that are renderable currently
    const templatesModified = templateList.filter((item) => {
      return item.type === "custom-template" || item.type === "application/pdf" || !item.type;
    });
    setTemplates(templatesModified);
    if (templatesModified.length > 0) {
      setSelectedTemplate(templatesModified[0].id);
    }
  }, []);

  const onPrint = () => {
    if (childRef.current) {
      childRef.current.print();
    }
  };

  return (
    <>
      <InvalidAttachmentsBanner
        hasInvalidAttachments={invalidAttachments.length > 0}
        invalidAttachments={invalidAttachments}
      />
      <div className="no-print mt-4">
        <MultiTabs
          hasAttachments={hasAttachments}
          attachments={attachments}
          templates={templates}
          setSelectedTemplate={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
          invalidAttachments={invalidAttachments}
        />
      </div>
      <div className="bg-white py-6">
        {attachments && (
          <div className={`${selectedTemplate !== "attachmentTab" ? "hidden" : "block"}`}>
            <TabPaneAttachments attachments={attachments} />
          </div>
        )}
        <div className={`${selectedTemplate === "attachmentTab" ? "hidden" : "block"}`}>
          {templates.length > 0 && (
            <DocumentUtility
              document={credential}
              onPrint={onPrint}
              selectedTemplate={selectedTemplate}
              downloadName={downloadName}
            />
          )}
          <DecentralisedRenderer
            rawDocument={credential}
            updateTemplates={updateTemplates}
            selectedTemplate={selectedTemplate}
            setPrivacyFilter={() => undefined}
            forwardedRef={childRef}
          />
        </div>
      </div>
    </>
  );
};
