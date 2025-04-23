import React from "react";
import { useDispatch } from "react-redux";
import { updateCertificate } from "../../reducers/certificate";
import { CertificateDropZoneContainer } from "../CertificateDropZone/CertificateDropZoneContainer";
import { setActive, reset } from "../../reducers/sample";
import { loadDemoCertificate, getDemoCert } from "./helpers";
import { useProviderContext } from "../../common/contexts/provider";

export const DropZoneSectionContainer = (): React.ReactElement => {
  const dispatch = useDispatch();
  const loadCertificate = React.useCallback((payload: any) => dispatch(updateCertificate(payload)), [dispatch]);
  const { currentChainId } = useProviderContext();

  return currentChainId ? (
    <div className="flex mt-4">
      <div className="w-full ">
        <div
          id="demoDrop"
          onDrop={(event) => {
            if (event.dataTransfer && event.dataTransfer.getData(getDemoCert(currentChainId))) {
              loadDemoCertificate(loadCertificate, currentChainId);
              dispatch(setActive());
            } else {
              dispatch(reset());
            }
          }}
        >
          <CertificateDropZoneContainer />
        </div>
      </div>
    </div>
  ) : (
    <div>You are currently on an unsupported network.</div>
  );
};
