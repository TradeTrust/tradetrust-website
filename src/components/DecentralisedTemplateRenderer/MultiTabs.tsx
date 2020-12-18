import React from "react";
import { TemplateProps } from "./../../types";

interface MultiTabsProps {
  className?: string;
  hasAttachments: boolean;
  attachments?: {
    filename: string;
    data: string;
    type: string;
  }[];
  templates: TemplateProps[];
  setSelectedTemplate: (id: string) => void;
  selectedTemplate: string;
}

export const MultiTabs = ({
  hasAttachments,
  attachments,
  templates,
  setSelectedTemplate,
  selectedTemplate,
}: MultiTabsProps) => {
  return (
    <div className="container">
      <div className="flex flex-wrap">
        {templates.map(({ id, label }) => (
          <div
            className={`p-4 mr-2 multi-tab ${id === selectedTemplate && "bg-white border-t-4 border-blue"}`}
            key={id}
            data-testid={id}
          >
            <div
              className="truncate"
              onClick={() => {
                setSelectedTemplate(id);
              }}
            >
              <span>{label}</span>
            </div>
          </div>
        ))}
        {hasAttachments && (
          <div
            className={`p-4 mr-2 multi-tab ${
              selectedTemplate === "attachmentTab" && "bg-white border-t-4 border-blue"
            }`}
          >
            <div
              className="truncate"
              data-testid="tab-attachment"
              onClick={() => {
                setSelectedTemplate("attachmentTab"); // To unset the last active tab
              }}
            >
              <span className="mr-2">Attachments</span>
              <span className="rounded bg-grey-300 p-2" data-testid="attachment-number">
                {attachments && attachments.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
