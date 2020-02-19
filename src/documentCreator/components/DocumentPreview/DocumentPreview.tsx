import React, { useCallback, useEffect, useState } from "react";
import {
  FrameConnector,
  FrameActions,
  HostActionsHandler,
  Document
} from "@govtechsg/decentralized-renderer-react-components";
import { css } from "@emotion/core";
import { get } from "lodash";

interface DocumentPreviewProps {
  document: Document;
}

export const DocumentPreview = ({ document }: DocumentPreviewProps): React.ReactElement => {
  const [toFrame, setToFrame] = useState<HostActionsHandler>();
  const [height, setHeight] = useState(50);
  const [templates, setTemplates] = useState<{ id: string; label: string }[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const sourceUrl = get(document, "$template.url", "");
  const fn = useCallback((handler: HostActionsHandler) => {
    // wrap into a function otherwise toFrame function will be executed
    setToFrame(() => handler);
  }, []);

  const fromFrame = (action: FrameActions): void => {
    if (action.type === "UPDATE_HEIGHT") {
      setHeight(action.payload);
    }
    if (action.type === "UPDATE_TEMPLATES") {
      setTemplates(action.payload);
      setSelectedTemplate(action.payload[0].id);
    }
  };
  useEffect(() => {
    if (toFrame) {
      toFrame({
        type: "RENDER_DOCUMENT",
        payload: {
          document
        }
      });
    }
  }, [document, toFrame]);
  useEffect(() => {
    if (toFrame && selectedTemplate) {
      toFrame({
        type: "SELECT_TEMPLATE",
        payload: selectedTemplate
      });
    }
  }, [selectedTemplate, toFrame]);

  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          .tab {
            margin-left: 1rem;
            margin-right: 1rem;
            margin-bottom: 0.5rem;
            padding: 1rem;
            border: 1px solid black;
            cursor: pointer;
          }
          .tab.selected {
            border: 1px solid blue;
          }
        `}
      >
        {templates.map(template => (
          <div
            key={template.id}
            className={`tab ${selectedTemplate === template.id ? "selected" : ""}`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {template.label}
          </div>
        ))}
      </div>
      <FrameConnector
        source={sourceUrl}
        dispatch={fromFrame}
        onConnected={fn}
        style={{ display: "block", margin: "auto", maxWidth: 1120, width: "100%", height: `${height}px` }}
      />
    </div>
  );
};
