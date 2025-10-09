import React from "react";
import { FormErrorBanner } from "../DynamicFormContainer/FormErrorBanner/FormErrorBanner";

interface InvalidAttachment {
  filename?: string;
  [key: string]: any;
}

interface InvalidAttachmentsBannerProps {
  hasInvalidAttachments: boolean;
  invalidAttachments: InvalidAttachment[];
}

/**
 * Component that displays an error banner for invalid attachments
 */
export const InvalidAttachmentsBanner: React.FunctionComponent<InvalidAttachmentsBannerProps> = ({
  hasInvalidAttachments,
  invalidAttachments,
}) => {
  if (!hasInvalidAttachments) return null;

  return (
    <div className="container">
      <FormErrorBanner
        formErrorTitle="Unable To Load Attachment"
        description="There is a problem loading the following attachments:"
        formErrors={invalidAttachments.map((attachment, index) => ({
          message: attachment.filename || `Attachment ${index + 1}`,
          path: `attachment_${index}`,
          suggestion: "",
          context: {
            errorType: "pattern",
          },
        }))}
        iconType="exclamation"
      />
    </div>
  );
};
