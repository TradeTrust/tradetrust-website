import React from "react";
import { connect } from "react-redux";
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
  <div className="hidden lg:block">
    <div className="flex items-end -mx-4">
      <div className="w-1/2 px-4">
        <div className="pulse" draggable onDragStart={(e) => e.dataTransfer.setData(DEMO_CERT, "true")}>
          <a href={DEMO_CERT} download="demo.tt" rel="noindex nofollow">
            <img style={{ cursor: "grabbing" }} src="/static/images/dropzone/cert.png" width="100%" />
          </a>
        </div>
      </div>
      <div className="w-1/2 px-4">
        <img src="/static/images/dropzone/arrow3.png" draggable={false} />
      </div>
    </div>
  </div>
);
interface DropZoneSectionProps {
  loadCertificate: LoadCertificate;
}

const DropZoneSection = ({ loadCertificate }: DropZoneSectionProps) => {
  return (
    <section id="verify-documents" className="bg-cerulean-50 pt-8 pb-12 lg:pt-12 lg:pb-16">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-5/12">
            <div className="py-8 px-0 text-center lg:text-left md:py-12 md:px-16 lg:pt-8 lg:pr-16 lg:pb-12 lg:pl-0">
              <h1 className="font-normal text-5xl leading-tight">An easy way to check and verify your documents</h1>
              <p className="text-lg py-6">
                TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place.
              </p>
              <DraggableDemoCertificate />
              <div className="block lg:hidden">
                <button
                  className="btn text-white bg-emerald-500 hover:bg-emerald-700"
                  draggable={false}
                  id="demoClick"
                  onClick={() => {
                    loadDemoCertificate(loadCertificate);
                  }}
                >
                  Click me for a demo document!
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-7/12">
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
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  loadCertificate: (payload: any) => dispatch(updateCertificate(payload)),
});

export const DropZoneSectionContainer = connect(null, mapDispatchToProps)(DropZoneSection);
