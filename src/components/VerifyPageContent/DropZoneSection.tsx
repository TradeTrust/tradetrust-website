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
  <div className="hidden md:block w-full md:w-1/2 p-2">
    <div className="flex justify-center items-center h-full">
      <div
        className="w-1/2 px-4 box-content flex items-center justify-center relative"
        draggable
        onDragStart={(e) => e.dataTransfer.setData(DEMO_CERT, "true")}
      >
        <img
          src="/static/images/dropzone/drop_arrow.svg"
          width="100%"
          className="absolute -left-24"
          style={{ width: "135px", top: "10%" }}
        />
        <a href={DEMO_CERT} download="demo.tt" rel="noindex nofollow" className="cursor-default relative">
          <img src="/static/images/dropzone/man_with_doc.svg" width="100%" />
          <img
            style={{ cursor: "grabbing" }}
            className="absolute top-0"
            src="/static/images/dropzone/certificate.svg"
            width="100%"
          />
        </a>
      </div>
      <div className="w-1/2 px-4 inline-block box-content">
        <div className="rounded-full h-60 w-60 bg-cerulean-500 flex items-center justify-center">
          <p className="text-xl px-5 text-center text-white font-bold">{roundInstructionsText}</p>
        </div>
      </div>
    </div>
  </div>
);

export const DropZoneSectionContainer = (): React.ReactElement => {
  const dispatch = useDispatch();
  const loadCertificate = React.useCallback((payload: any) => dispatch(updateCertificate(payload)), [dispatch]);
  return (
    <section id="verify-documents" className="pb-12 lg:pb-16">
      <div className="container">
        <h1 className="p-2">Verify Documents</h1>
        <div className="flex flex-wrap md:flex-nowrap">
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
      </div>
    </section>
  );
};
