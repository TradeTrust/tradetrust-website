import React, { FunctionComponent } from "react";
import { TemplateProps } from "./../../types";
import { OpenAttestationAttachment } from "../../utils/shared";
import { IconAlert } from "../UI/Icon/Icon";

// Type for invalid attachments with additional properties
type InvalidAttachment = OpenAttestationAttachment & {
  index: number;
  isInvalid: boolean;
};

interface MultiTabsProps {
  className?: string;
  hasAttachments: boolean;
  attachments?: OpenAttestationAttachment[];
  templates: TemplateProps[];
  setSelectedTemplate: (id: string) => void;
  selectedTemplate: string;
  invalidAttachments?: InvalidAttachment[];
}

export const MultiTabs: FunctionComponent<MultiTabsProps> = ({
  hasAttachments,
  attachments,
  templates,
  setSelectedTemplate,
  selectedTemplate,
  invalidAttachments = [],
}) => {
  return (
    <div className="container">
      <div className="flex overflow-x-auto items-end">
        {templates.map(({ id, label }, templateIndex) => {
          const hasInvalidForThisTemplate = invalidAttachments.some(
            (invalidAttachment) => invalidAttachment.index === templateIndex - 1 && invalidAttachment.filename === label
          );

          return (
            <div
              className={`px-3 py-2 mr-2 multi-tab border-t border-r border-l rounded-t-xl border-cloud-100 ${
                id === selectedTemplate ? "bg-white text-cloud-800" : "bg-cloud-100 text-cloud-300"
              }`}
              key={id}
              data-testid={id}
            >
              <div
                className="truncate"
                onClick={() => {
                  setSelectedTemplate(id);
                }}
              >
                <span className="flex items-center">
                  {hasInvalidForThisTemplate && <IconAlert className="w-4 h-4 mr-1 flex-shrink-0" />}
                  {label}
                </span>
              </div>
            </div>
          );
        })}
        {hasAttachments && (
          <div
            className={`px-3 py-2 mr-2 multi-tab border-t border-r border-l rounded-t-xl border-cloud-100 ${
              selectedTemplate === "attachmentTab" ? "bg-white text-cloud-800" : "bg-cloud-100 text-cloud-300"
            }`}
          >
            <div
              className="flex flex-nowrap items-center"
              data-testid="tab-attachment"
              onClick={() => {
                setSelectedTemplate("attachmentTab"); // To unset the last active tab
              }}
            >
              <div className="mr-2 w-auto">Attachments</div>
              <div className="rounded-full w-6 h-6 bg-cloud-200 text-center" data-testid="attachment-number">
                {attachments && attachments.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
