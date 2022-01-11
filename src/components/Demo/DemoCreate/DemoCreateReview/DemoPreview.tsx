import React, { useState, useCallback, useRef, FunctionComponent } from "react";
import { FrameConnector, renderDocument, FrameActions } from "@govtechsg/decentralized-renderer-react-components";
import { utils } from "@govtechsg/open-attestation";
import { Dispatch } from "../../../../types";
import { TradeTrustDocument } from "../../../../types";

interface DocumentPreviewProps {
  document: TradeTrustDocument;
}

export const DocumentPreview: FunctionComponent<DocumentPreviewProps> = ({ document }) => {
  const toFrame = useRef<Dispatch>();
  const [height, setHeight] = useState(0);
  const rendererUrl = utils.getTemplateURL(document);

  const onConnected = useCallback(
    (frame) => {
      toFrame.current = frame;
      if (toFrame.current) {
        toFrame.current(renderDocument({ document }));
      }
    },
    [document]
  );
  const handleDispatch = (action: FrameActions): void => {
    if (action.type === "UPDATE_HEIGHT") {
      setHeight(action.payload);
    }
    if (action.type === "OBFUSCATE") {
      alert("Privacy filter not available in preview mode");
    }
  };

  return rendererUrl ? (
    <FrameConnector
      source={rendererUrl}
      dispatch={handleDispatch}
      onConnected={onConnected}
      style={{ height }}
      className="block m-auto w-full"
    />
  ) : null;
};
