import React from "react";
import { shallow } from "enzyme";
import { CertificateDropZoneContainer } from "./CertificateDropZoneContainer";

describe("certificateDropZoneContainer", () => {
  it("toggles qrReaderVisible when toggleQrReaderVisible is called", () => {
    const wrapper = shallow(<CertificateDropZoneContainer updateNetworkId={() => {}} />);
    expect(wrapper.state().qrReaderVisible).toBe(false);
    wrapper.instance().toggleQrReaderVisible();
    expect(wrapper.state().qrReaderVisible).toBe(true);
    wrapper.instance().toggleQrReaderVisible();
    expect(wrapper.state().qrReaderVisible).toBe(false);
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
