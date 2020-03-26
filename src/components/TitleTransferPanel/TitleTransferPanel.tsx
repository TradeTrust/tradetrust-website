import React from "react";
import { LabelBordered } from "../UI/LabelBordered";
import { TitleTransferPanelContent } from "./TitleTransferPanelContent";
import { WrappedDocument } from "@govtechsg/open-attestation";

interface TitleTransferPanelProps {
  document: WrappedDocument;
}

export const TitleTransferPanel = ({ document }: TitleTransferPanelProps) => {
  return (
    <section id="title-transfer-panel" className="bg-blue-lighter py-3">
      <div className="container-custom">
        <div className="row">
          <div className="col-12">
            <div className="py-2">
              <LabelBordered color="red">This is a transferable record</LabelBordered>
              <LabelBordered color="red">Negotiable</LabelBordered>
            </div>
          </div>
        </div>
        <TitleTransferPanelContent document={document} />
      </div>
    </section>
  );
};
