import React from "react";
import { useDispatch } from "react-redux";
import { roundInstructionsText } from ".";
import { NETWORK_NAME } from "../../config";
import { updateCertificate } from "../../reducers/certificate";
import CertificateDropzoneContainer from "../CertificateDropZone";

type LoadCertificate = (certificate: any) => void;

const DEMO_CERT = `/static/demo/${NETWORK_NAME}.tt`;

const loadDemoCertificate = (loadCertificate: LoadCertificate) => {
  window
    .fetch(DEMO_CERT)
    .then((res) => res.json())
    .then((res) => {
      loadCertificate(res);
    });
};

const DraggableDemoCertificate = () => (
  <div className="hidden md:block w-full md:w-1/2 px-4">
    <div className="flex flex-wrap lg:flex-nowrap justify-center items-center h-full -mx-4">
      <div
        className="w-2/3 lg:w-1/2 px-4 box-content flex items-center justify-center relative"
        draggable
        onDragStart={(e) => e.dataTransfer.setData(DEMO_CERT, "true")}
      >
        <img
          src="/static/images/dropzone/drop_arrow.svg"
          className="absolute -left-40 lg:-left-24 xl:-left-32"
          style={{ width: "135px", top: "10%" }}
        />
        <a href={DEMO_CERT} download="demo.tt" rel="noindex nofollow" className="cursor-default relative">
          <img src="/static/images/dropzone/man_with_doc.svg" />
          <img
            className="absolute top-0 cursor-grab active:cursor-grabbing"
            src="/static/images/dropzone/certificate.svg"
          />
        </a>
      </div>
      <div className="w-2/3 lg:w-1/2 xl:w-1/3 px-4 inline-block box-content">
        <div className="aspect-w-1 aspect-h-1">
          <div className="rounded-full w-full h-full bg-cerulean-500 flex items-center justify-center">
            <p className="text-xl px-5 text-center text-white font-bold">{roundInstructionsText}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const DropZoneSectionContainer = (): React.ReactElement => {
  const dispatch = useDispatch();
  const loadCertificate = React.useCallback((payload: any) => dispatch(updateCertificate(payload)), [dispatch]);
  return (
    <div className="flex flex-wrap md:flex-nowrap mt-4 -mx-4">
      <div className="w-full md:w-1/2">
        <div
          id="demoDrop"
          onDrop={(event) => {
            if (event.dataTransfer && event.dataTransfer.getData(DEMO_CERT)) {
              loadDemoCertificate(loadCertificate);
            }
          }}
        >
          <CertificateDropzoneContainer />
        </div>
      </div>
      <DraggableDemoCertificate />
    </div>
  );
};
