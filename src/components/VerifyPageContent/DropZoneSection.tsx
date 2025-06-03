import React from "react";
import { CertificateDropZoneContainer } from "../CertificateDropZone/CertificateDropZoneContainer";

export const DropZoneSectionContainer = (): React.ReactElement => {
  return (
    <div className="flex mt-4">
      <div className="w-full ">
        <CertificateDropZoneContainer />
      </div>
    </div>
  );
};
