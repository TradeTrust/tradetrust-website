import React from "react";
import { LabelBordered } from "../Helpers/LabelBordered";
import { TitleEscrow } from "./TitleEscrow";

export const TitleTransferPanel = () => {
  return (
    <section className="bg-blue-lighter py-3">
      <div className="container-custom">
        <div className="row">
          <div className="col-12">
            <div className="py-2">
              <LabelBordered color="red">
                <p>This is a transferable record</p>
              </LabelBordered>
              <LabelBordered color="red">
                <p>Negotiable</p>
              </LabelBordered>
            </div>
          </div>
        </div>
        <TitleEscrow />
      </div>
    </section>
  );
};
