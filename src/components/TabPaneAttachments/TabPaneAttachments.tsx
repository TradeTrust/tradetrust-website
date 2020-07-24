import React from "react";
import { Tab } from "react-bootstrap";
import { AttachmentLink } from "../UI/AttachmentLink";

interface TabPaneAttachmentsProps {
  attachments: {
    filename: string;
    data: string;
    type: string;
  }[];
}

export const TabPaneAttachments = ({ attachments }: TabPaneAttachmentsProps) => {
  return (
    <Tab.Pane eventKey="tab-attachment">
      <div className="container-custom">
        <div className="row">
          {attachments.map(({ filename, data, type }) => (
            <div className="col-6 col-lg-4 col-xl-3 mb-3" key={data}>
              <AttachmentLink className="h-100" filename={filename} data={data} type={type} />
            </div>
          ))}
        </div>
      </div>
    </Tab.Pane>
  );
};
