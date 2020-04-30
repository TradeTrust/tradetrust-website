import React from "react";
import { LabelBordered } from "../../UI/LabelBordered";

export const AssetManagementTags = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="py-2">
          <LabelBordered color="red">This is a transferable record</LabelBordered>
          <LabelBordered color="red">Negotiable</LabelBordered>
        </div>
      </div>
    </div>
  );
};
