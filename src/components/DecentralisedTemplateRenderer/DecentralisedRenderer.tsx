import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import { applyPrivacyFilter } from "../../reducers/certificate";
import { FrameActions, FrameConnector, HostActionsHandler } from "@govtechsg/decentralized-renderer-react-components";
import { LEGACY_OPENCERTS_RENDERER } from "../../config";

interface DecentralisedRendererProps {
  rawDocument: WrappedDocument;
  updateTemplates: (templates: { id: string; label: string }[]) => void;
  selectedTemplate: string;
  applyPrivacyFilter: (doc: any) => void;
}
export const DecentralisedRenderer: FunctionComponent<DecentralisedRendererProps> = ({
  rawDocument,
  updateTemplates,
  selectedTemplate,
  applyPrivacyFilter,
}) => {
  const [toFrame, setToFrame] = useState<HostActionsHandler>();
  const [height, setHeight] = useState(0);
  const onConnected = useCallback((toFrame: HostActionsHandler) => {
    // wrap into a function otherwise toFrame function will be executed
    setToFrame(() => toFrame);
  }, []);
  const document = useMemo(() => getData(rawDocument), [rawDocument]);

  const fromFrame = useCallback(
    (action: FrameActions): void => {
      if (action.type === "UPDATE_HEIGHT") {
        setHeight(action.payload);
      }
      if (action.type === "UPDATE_TEMPLATES") {
        updateTemplates(action.payload);
      }
      if (action.type === "OBFUSCATE") {
        applyPrivacyFilter(action.payload);
      }
    },
    [updateTemplates, applyPrivacyFilter]
  );
  useEffect(() => {
    if (toFrame) {
      toFrame({
        type: "RENDER_DOCUMENT",
        payload: {
          document,
        },
      });
    }
  }, [document, toFrame]);
  useEffect(() => {
    if (toFrame && selectedTemplate) {
      console.log("select template", selectedTemplate);
      toFrame({
        type: "SELECT_TEMPLATE",
        payload: selectedTemplate,
      });
    }
  }, [selectedTemplate, toFrame]);

  return (
    <FrameConnector
      style={{ height: `${height}px`, width: "100%", border: "0px" }}
      source={`${typeof rawDocument.data.$template === "object" ? document.$template.url : LEGACY_OPENCERTS_RENDERER}`}
      dispatch={fromFrame}
      onConnected={onConnected}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  applyPrivacyFilter: (path: any) => dispatch(applyPrivacyFilter(path)),
});

export const DecentralisedRendererContainer = connect(null, mapDispatchToProps)(DecentralisedRenderer);
