import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ViewerButton, ViewerContainer } from "./SharedViewerStyledComponents";

const MY_JSON_FILE = {
  version: "https://schema.openattestation.com/2.0/schema.json",
  data: {
    $template: {
      type: "f26b181a-ad43-4446-a6bd-cbbcb8751188:string:EMBEDDED_RENDERER",
      name: "dbfc748d-68a3-4094-bb6a-a3eef2be4005:string:COVERING_LETTER",
      url: "bc4a6388-0b8b-4229-a41a-b000b44faeea:string:https://generic-templates.openattestation.com",
    },
    issuers: [
      {
        name: "405fe27f-fd5c-4a5d-86e5-479e32ae5e04:string:Demo Issuer",
        documentStore: "f4d721d6-6acd-46b4-b5ea-48b48613726c:string:0x8bA63EAB43342AAc3AdBB4B827b68Cf4aAE5Caca",
        identityProof: {
          type: "841f3daa-dcfd-49d2-8496-59039a552e79:string:DNS-TXT",
          location: "a0327df4-308c-4565-ad16-c1592a58b264:string:demo-tradetrust.openattestation.com",
        },
      },
    ],
    name: "1f0fdca1-76b2-4a91-b69a-967499e2e1ee:string:Covering Letter",
    logo: "97420404-7f3a-4bba-bfc1-de673eef5828:string:https://www.aretese.com/images/govtech-animated-logo.gif",
    title: "2212af21-e1c2-4cc3-9eb0-5e8b051068b4:string:REFERENCE",
    description:
      "33818b3c-700f-4eab-ba1b-66c78d5c75be:string:Some very important documents in here for some submission",
    links: {
      self: {
        href:
          "7e04712e-d9d4-49ac-a60d-39f218062344:string:https://action.openattestation.com?q=%7B%22type%22%3A%22DOCUMENT%22%2C%22payload%22%3A%7B%22uri%22%3A%22https%3A%2F%2Fapi-ropsten.tradetrust.io%2Fstorage%2F811c4b0b-9d6c-4e23-9e0f-a4015e6704ae%22%2C%22key%22%3A%22ca77102794c904221d479635ec7a23074eac983e07742994fcc4d021512a52e9%22%2C%22permittedActions%22%3A%5B%22STORE%22%5D%2C%22redirect%22%3A%22https%3A%2F%2Fdev.tradetrust.io%2F%22%7D%7D",
      },
    },
  },
  signature: {
    type: "SHA3MerkleProof",
    targetHash: "008f5c4dac002e1582a910ef19815ebe1675e0adf9b179406f11c927f797b9b3",
    proof: [],
    merkleRoot: "008f5c4dac002e1582a910ef19815ebe1675e0adf9b179406f11c927f797b9b3",
  },
};

//sending message to child window
const openTab = (url) => {
  const childWin = window.open(url, "child");
  window.addEventListener(
    "message",
    (event) => {
      if (event.data.messageType == "SYN") {
        childWin.postMessage({ messageType: "SYNACK" });
      }
      if (event.data.messageType == "ACK") {
        childWin.postMessage({ messageType: "DOC", document: MY_JSON_FILE });
      }
    },
    false
  );
};

export const DefaultView = ({ hover, accept, toggleQrReaderVisible }) => {
  return (
    <ViewerContainer data-id="viewer-container" className={`${hover ? (accept ? "accept" : "invalid") : "default"}`}>
      <div className="image-container">
        <i>
          <img alt=".tradetrust Dropzone" src="/static/images/dropzone/dropzone_illustration.svg" />
        </i>
      </div>
      {accept ? null : <div>File cannot be read. Please check that you have a valid .tt or .json file</div>}
      <div className="text-brand-navy" style={{ fontSize: "1.375rem", fontWeight: 500 }}>
        Drag and drop your tradetrust file
      </div>
      <div className="text-muted">to view its contents</div>
      <div className="text-muted row">
        <div className="col-2" />
        <div className="col-3">
          <hr />
        </div>
        <div className="col-2">or</div>
        <div className="col-3">
          <hr />
        </div>
      </div>
      <div className="text-muted row">
        <div className="mx-auto">
          <ViewerButton>Select File</ViewerButton>
          <ViewerButton
            onClick={() => {
              console.log("clicked");
              openTab("http://localhost:3000/#verify-documents");
            }}
          >
            Open doc w/o server
          </ViewerButton>
          <ViewerButton
            data-id="scan-qr-button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleQrReaderVisible();
            }}
          >
            Scan QR Code
          </ViewerButton>
        </div>
      </div>
    </ViewerContainer>
  );
};
