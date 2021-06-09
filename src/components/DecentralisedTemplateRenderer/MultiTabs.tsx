import React, { FunctionComponent } from "react";
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

export const MultiTabs: FunctionComponent<MultiTabsProps> = ({
  hasAttachments,
  attachments,
  templates,
  setSelectedTemplate,
  selectedTemplate,
}) => {
  return (
    <div className="container">
      <div className="flex flex-wrap items-end">
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
              className="flex flex-nowrap items-center"
              data-testid="tab-attachment"
              onClick={() => {
                setSelectedTemplate("attachmentTab"); // To unset the last active tab
              }}
            >
              <div className="mr-2 w-auto">Attachments</div>
              <div className="rounded-full w-6 h-6 bg-gray-300 text-center" data-testid="attachment-number">
                {attachments && attachments.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
