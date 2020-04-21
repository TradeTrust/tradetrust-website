import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import { updateObfuscatedCertificate } from "../../reducers/certificate";
import { FrameActions, FrameConnector, HostActionsHandler } from "@govtechsg/decentralized-renderer-react-components";
import { LEGACY_OPENCERTS_RENDERER } from "../../config";

interface DecentralisedRendererProps {
  rawDocument: WrappedDocument;
  updateTemplates: (templates: { id: string; label: string }[]) => void;
  selectedTemplate: string;
}
export const DecentralisedRenderer: FunctionComponent<DecentralisedRendererProps> = ({
  rawDocument,
  updateTemplates,
  selectedTemplate,
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
    },
    [updateTemplates]
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
    <section>
      <FrameConnector
        style={{ height: `${height}px`, width: "100%", border: "0px" }}
        source={`${
          typeof rawDocument.data.$template === "object" ? document.$template.url : LEGACY_OPENCERTS_RENDERER
        }`}
        dispatch={fromFrame}
        onConnected={onConnected}
      />
    </section>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  updateObfuscatedCertificate: (updatedDoc: any) => dispatch(updateObfuscatedCertificate(updatedDoc)),
});

export const DecentralisedRendererContainer = connect(null, mapDispatchToProps)(DecentralisedRenderer);
