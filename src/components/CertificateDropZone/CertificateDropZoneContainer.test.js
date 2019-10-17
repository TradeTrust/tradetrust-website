import React from "react";
import { shallow } from "enzyme";
import { CertificateDropZoneContainer } from "./CertificateDropZoneContainer";
import QrReader from "../QrReader";
import CertificateDropZone from "./CertificateDropZone";

describe("certificateDropZoneContainer", () => {
  it("toggles qrReaderVisible when toggleQrReaderVisible is called", () => {
    const wrapper = shallow(<CertificateDropZoneContainer updateNetworkId={() => {}} />);
    expect(wrapper.state().qrReaderVisible).toBe(false);
    wrapper.instance().toggleQrReaderVisible();
    expect(wrapper.state().qrReaderVisible).toBe(true);
    wrapper.instance().toggleQrReaderVisible();
    expect(wrapper.state().qrReaderVisible).toBe(false);
  });

  it("shows QrReader when qrReaderVisible is true", () => {
    const wrapper = shallow(<CertificateDropZoneContainer updateNetworkId={() => {}} />);
    wrapper.instance().toggleQrReaderVisible();
    expect(wrapper.state().qrReaderVisible).toBe(true);
    expect(wrapper.find(QrReader)).toHaveLength(1);
    expect(wrapper.find(CertificateDropZone)).toHaveLength(0);
  });

  it("shows CertificateDropZone when qrReaderVisible is false", () => {
    const wrapper = shallow(<CertificateDropZoneContainer updateNetworkId={() => {}} />);
    expect(wrapper.state().qrReaderVisible).toBe(false);
    expect(wrapper.find(QrReader)).toHaveLength(0);
    expect(wrapper.find(CertificateDropZone)).toHaveLength(1);
  });

  it("dispatches processQr and set turn off QrReader when a code is scanned", () => {
    const processQr = jest.fn();
    const wrapper = shallow(<CertificateDropZoneContainer updateNetworkId={() => {}} processQr={processQr} />);
    wrapper.instance().toggleQrReaderVisible();
    wrapper.instance().handleQrScanned("SOME_QR_DATA");
    expect(processQr).toHaveBeenCalledWith("SOME_QR_DATA");
    expect(wrapper.state().qrReaderVisible).toBe(false);
  });

  it("dispatches updateCertificate and unset fileError when new certificate is presented", () => {
    const updateCertificate = jest.fn();
    const wrapper = shallow(
      <CertificateDropZoneContainer updateNetworkId={() => {}} updateCertificate={updateCertificate} />
    );
    wrapper.setState({ fileError: true });
    wrapper.instance().handleCertificateChange("SOME_DOCUMENT_DATA");
    expect(updateCertificate).toHaveBeenCalledWith("SOME_DOCUMENT_DATA");
    expect(wrapper.state().fileError).toBe(false);
  });
});
