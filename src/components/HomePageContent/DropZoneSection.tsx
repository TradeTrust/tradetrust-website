import React, { Component } from "react";
import { connect } from "react-redux";
import CertificateDropzoneContainer from "../CertificateDropZone";
import css from "./dropZoneSection.scss";
import { updateCertificate } from "../../reducers/certificate";
import { trace } from "../../utils/logger";
import { IS_MAINNET } from "../../config";
import MAIN from "./Main-Demo.json";
import ROPSTEN from "./Ropsten-Demo.json";

const DEMO_CERT = IS_MAINNET ? MAIN : ROPSTEN;
const DEMO_CONTENT_KEY = "DEMO_CONTENT";

const DraggableDemoCertificate = () => (
  <div className="d-none d-lg-block">
    <div className="row">
      <div className="col">
        <div className={css.pulse} draggable onDragStart={e => e.dataTransfer.setData(DEMO_CONTENT_KEY, "true")}>
          <a href={`data:text/plain;,${JSON.stringify(DEMO_CERT, null, 2)}`} download="demo.tt">
            <img style={{ cursor: "grabbing" }} src="/static/images/dropzone/cert.png" width="100%" />
          </a>
        </div>
      </div>
      <div className="col">
        <img src="/static/images/dropzone/arrow3.png" width="100%" draggable={false} />
      </div>
    </div>
  </div>
);

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
        cursor: "pointer"
      }}
    >
      Click me for a demo document!
    </a>
  </div>
);

interface DropZoneSectionProps {
  updateCertificate: (certificate: any) => void;
}

class DropZoneSection extends Component<DropZoneSectionProps> {
  componentDidMount() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("demoDrop")!.addEventListener("drop", e => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (e.dataTransfer!.getData(DEMO_CONTENT_KEY)) {
        this.props.updateCertificate(DEMO_CERT);
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("demoClick")!.addEventListener("click", () => {
      this.props.updateCertificate(DEMO_CERT);
    });
  }

  componentWillUnmount() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("demoDrop")!.removeEventListener("drop", () => this.removeListener());
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("demoClick")!.removeEventListener("click", () => this.removeListener());
  }

  removeListener = () => trace("drop listener removed");

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="row p-5 bg-brand-dark text-white">
        <div className={css.main}>
          <div className="col-lg-5 col-md-12">
            <div className={css.description}>
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
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateCertificate: (payload: any) => dispatch(updateCertificate(payload))
});

export const DropZoneSectionContainer = connect(null, mapDispatchToProps)(DropZoneSection);
