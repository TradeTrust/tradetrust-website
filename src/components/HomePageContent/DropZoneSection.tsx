import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "./../../styles";
import { connect } from "react-redux";
import CertificateDropzoneContainer from "../CertificateDropZone";
import { updateCertificate } from "../../reducers/certificate";
import { trace } from "../../utils/logger";
import { NETWORK_NAME } from "../../config";

const DEMO_CERT = `/static/demo/${NETWORK_NAME}.tt`;

interface DraggableDemoCertificateProps {
  className?: string;
}

const DraggableDemoCertificate = styled(({ className }: DraggableDemoCertificateProps) => (
  <div className={`${className} d-none d-lg-block`}>
    <div className="row">
      <div className="col">
        <div className="pulse" draggable onDragStart={(e) => e.dataTransfer.setData(DEMO_CERT, "true")}>
          <a href={DEMO_CERT} download="demo.tt" rel="noindex nofollow">
            <img style={{ cursor: "grabbing" }} src="/static/images/dropzone/cert.png" width="100%" />
          </a>
        </div>
      </div>
      <div className="col">
        <img src="/static/images/dropzone/arrow3.png" width="100%" draggable={false} />
      </div>
    </div>
  </div>
))`
  .pulse {
    margin: 0 auto;
    display: table;
    margin-top: 50px;
    animation: pulse 3s alternate infinite;
  }
`;

const MobileDemoCertificate = () => (
  <div className="d-block d-lg-none d-xl-none">
    <a
      className="btn btn-primary btn-lg"
      role="button"
      draggable={false}
      id="demoClick"
      style={{
        background: "#28a745",
        border: "none",
        cursor: "pointer",
      }}
    >
      Click me for a demo document!
    </a>
  </div>
);

interface DropZoneSectionProps {
  className?: string;
  updateCertificate: (certificate: any) => void;
}

const DropZoneSection = styled(({ className, updateCertificate }: DropZoneSectionProps) => {
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
          updateCertificate(res);
        });
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById("demoDrop")!.removeEventListener("drop", () => removeListener());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById("demoClick")!.removeEventListener("click", () => removeListener());
    };
  }, [updateCertificate]);

  return (
    <section id="verify-documents" className={`${className} bg-brand-navy text-white`}>
      <div className="container-custom">
        <div className="row">
          <div className="col-lg-5 col-md-12">
            <div className="description">
              <h1>An easy way to check and verify your documents</h1>
              <p>TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place.</p>
              <DraggableDemoCertificate />
              <MobileDemoCertificate />
            </div>
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12" id="demoDrop">
            <CertificateDropzoneContainer />
          </div>
        </div>
      </div>
    </section>
  );
})`
  padding-top: 30px;
  padding-bottom: 45px;

  @media only screen and (min-width: ${vars.lg}) {
    padding-top: 45px;
    padding-bottom: 60px;
  }

  h3 {
    color: ${vars.white};
  }

  .description {
    padding: 32px 0;
    text-align: center;

    @media only screen and (min-width: ${vars.md}) {
      padding: 48px 64px;
    }

    @media only screen and (min-width: ${vars.lg}) {
      padding: 32px 64px 48px 0;
      text-align: left;
    }

    h1 {
      ${mixin.fontMontserratRegular};
    }

    p {
      ${mixin.fontSize(18)}
      padding: 24px 0;
      color: rgba(${vars.white}, 0.7);
    }
  }
`;

const mapDispatchToProps = (dispatch: any) => ({
  updateCertificate: (payload: any) => dispatch(updateCertificate(payload)),
});

export const DropZoneSectionContainer = connect(null, mapDispatchToProps)(DropZoneSection);
