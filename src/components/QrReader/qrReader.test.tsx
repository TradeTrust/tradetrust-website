import React from "react";
import { shallow } from "enzyme";
import { QrReaderZone } from "./qrReader";
import QrReader from "react-qr-reader";

describe("qrReader", () => {
  it("fires handleQrScanned when data is present in code scanned", () => {
    const handleQrScanned = jest.fn();
    const wrapper = shallow(<QrReaderZone handleQrScanned={handleQrScanned} />);
    const qrReaderElm = wrapper.find(QrReader);
    qrReaderElm.prop("onScan")("SOME_QR_CODE");
    expect(handleQrScanned).toHaveBeenCalledTimes(1);
    expect(handleQrScanned).toHaveBeenCalledWith("SOME_QR_CODE");
  });

  it("does not fire handleQrScanned when data is not present in scans", () => {
    const handleQrScanned = jest.fn();
    const wrapper = shallow(<QrReaderZone handleQrScanned={handleQrScanned} />);
    const qrReaderElm = wrapper.find(QrReader);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore force test
    qrReaderElm.prop("onScan")();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore force test
    qrReaderElm.prop("onScan")(undefined);
    qrReaderElm.prop("onScan")(null);
    qrReaderElm.prop("onScan")("");

    expect(handleQrScanned).toHaveBeenCalledTimes(0);
  });
});
