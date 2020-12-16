import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NETWORK_NAME } from "../../config";
import { updateCertificate } from "../../reducers/certificate";
import { trace } from "../../utils/logger";
import CertificateDropzoneContainer from "../CertificateDropZone";

const DEMO_CERT = `/static/demo/${NETWORK_NAME}.tt`;

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

const MobileDemoCertificate = () => (
  <div className="block lg:hidden">
    <button className="btn bg-green hover:bg-green-600" draggable={false} id="demoClick">
      Click me for a demo document!
    </button>
  </div>
);

interface DropZoneSectionProps {
  loadCertificate: (certificate: any) => void;
}

const DropZoneSection = ({ loadCertificate }: DropZoneSectionProps) => {
  const removeListener = () => trace("drop listener removed");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("demoDrop")!.addEventListener("drop", (event) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (event.dataTransfer && event.dataTransfer.getData(DEMO_CERT)) {
        window
          .fetch(DEMO_CERT)
          .then((res) => res.json())
          .then((res) => {
            updateCertificate(res);
          });
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("demoClick")!.addEventListener("click", () => {
      window
        .fetch(DEMO_CERT)
        .then((res) => res.json())
        .then((res) => {
          loadCertificate(res);
        });
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById("demoDrop")!.removeEventListener("drop", () => removeListener());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById("demoClick")!.removeEventListener("click", () => removeListener());
    };
  }, [loadCertificate]);

  return (
    <section id="verify-documents" className="bg-navy text-white pt-8 pb-12 lg:pt-12 lg:pb-16">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-5/12">
            <div className="py-8 px-0 text-center lg:text-left md:py-12 md:px-16 lg:pt-8 lg:pr-16 lg:pb-12 lg:pl-0">
              <h1 className="font-normal text-5xl leading-none">An easy way to check and verify your documents</h1>
              <p className="text-lg py-6 text-grey-200">
                TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place.
              </p>
              <DraggableDemoCertificate />
              <MobileDemoCertificate />
            </div>
          </div>
          <div className="w-full lg:w-7/12" id="demoDrop">
            <CertificateDropzoneContainer />
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
