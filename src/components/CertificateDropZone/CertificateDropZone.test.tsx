import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CertificateDropZoneContainer } from "./CertificateDropZoneContainer";
import { CertificateDropZone } from "./CertificateDropZone";
jest.mock("qr-scanner");

describe("CertificateDropZone", () => {
  it("shows QrReader when qrReaderVisible is true", () => {
    render(
      <CertificateDropZoneContainer updateNetworkId={() => {}}>
        <CertificateDropZone handleCertificateChange={() => {}} handleFileError={() => {}} />
      </CertificateDropZoneContainer>
    );
    fireEvent.click(screen.getByTestId("scan-qr-button"));
    expect(screen.getByTestId("qr-code-reader")).not.toBeNull();
  });

  it("shows CertificateDropZone when qrReaderVisible is false", () => {
    render(
      <CertificateDropZoneContainer updateNetworkId={() => {}}>
        <CertificateDropZone handleCertificateChange={() => {}} handleFileError={() => {}} />
      </CertificateDropZoneContainer>
    );
    expect(screen.getByTestId("certificate-dropzone")).not.toBeNull();
  });
});
