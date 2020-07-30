import React, { FunctionComponent, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import { applyPrivacyFilter } from "../../reducers/certificate";
import {
  FrameActions,
  FrameConnector,
  HostActions,
  renderDocument,
  selectTemplate,
} from "@govtechsg/decentralized-renderer-react-components";
import { LEGACY_OPENCERTS_RENDERER } from "../../config";
import { TemplateProps } from "./../../types";

interface DecentralisedRendererProps {
  rawDocument: WrappedDocument;
  updateTemplates: (templates: TemplateProps[]) => void;
  selectedTemplate: string;
  applyPrivacyFilter: (doc: any) => void;
}

type Dispatch = (action: HostActions) => void;
const SCROLLBAR_WIDTH = 20; // giving scrollbar a default width as there are no perfect ways to get it

export const DecentralisedRenderer: FunctionComponent<DecentralisedRendererProps> = ({
  rawDocument,
  updateTemplates,
  selectedTemplate,
  applyPrivacyFilter,
}) => {
  const toFrame = useRef<Dispatch>();
  const document = useMemo(() => getData(rawDocument), [rawDocument]);
  const [height, setHeight] = useState(0);

  const onConnected = useCallback(
    (frame) => {
      toFrame.current = frame;
      if (toFrame.current) {
        toFrame.current(renderDocument({ document, rawDocument }));
      }
    },
    [document, rawDocument]
  );

  const dispatch = (action: FrameActions): void => {
    if (action.type === "UPDATE_HEIGHT") {
      setHeight(action.payload + SCROLLBAR_WIDTH); // adding SCROLLBAR_WIDTH in case the frame content overflow horizontally, which will cause scrollbars to appear
    }
    if (action.type === "UPDATE_TEMPLATES") {
      updateTemplates(action.payload);
    }
    if (action.type === "OBFUSCATE") {
      applyPrivacyFilter(action.payload);
    }
  };

  // render document onload
  useEffect(() => {
    if (toFrame.current) {
      toFrame.current(renderDocument({ document }));
    }
  }, [document, toFrame]);

  // update document when click on template tab
  useEffect(() => {
    if (toFrame.current && selectedTemplate) {
      toFrame.current(selectTemplate(selectedTemplate));
    }
  }, [selectedTemplate, toFrame]);

  return (
    <FrameConnector
      style={{ height: `${height}px`, width: "100%", border: "0px" }}
      source={`${typeof rawDocument.data.$template === "object" ? document.$template.url : LEGACY_OPENCERTS_RENDERER}`}
      dispatch={dispatch}
      onConnected={onConnected}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  applyPrivacyFilter: (path: any) => dispatch(applyPrivacyFilter(path)),
});

export const DecentralisedRendererContainer = connect(null, mapDispatchToProps)(DecentralisedRenderer);
