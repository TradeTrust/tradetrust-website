import React from "react";
import { LabelBordered } from "../UI/LabelBordered";
import { TitleTransferPanelContent } from "./TitleTransferPanelContent";

export const TitleTransferPanel = () => {
  return (
    <section className="bg-blue-lighter py-3">
      <div className="container-custom">
        <div className="row">
          <div className="col-12">
            <div className="py-2">
              <LabelBordered color="red">This is a transferable record</LabelBordered>
              <LabelBordered color="red">Negotiable</LabelBordered>
            </div>
          </div>
        </div>
        <TitleTransferPanelContent />
      </div>
    </section>
  );
};
