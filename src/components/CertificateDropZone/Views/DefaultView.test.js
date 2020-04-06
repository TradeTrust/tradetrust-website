import React from "react";
import { shallow } from "enzyme";
import { DefaultView } from "./DefaultView";

describe("defaultView", () => {
  it("displays correctly if accept is true", () => {
    const wrapper = shallow(<DefaultView hover={true} accept={true} toggleQrReaderVisible={() => {}} />);
    const viewerContainerElm = wrapper.find("[data-id='viewer-container']");
    expect(viewerContainerElm.text()).not.toContain("File cannot be read");
  });

  it("displays correctly class if accept is false", () => {
    const wrapper = shallow(<DefaultView hover={true} accept={false} toggleQrReaderVisible={() => {}} />);
    const viewerContainerElm = wrapper.find("[data-id='viewer-container']");
    expect(viewerContainerElm.text()).toContain("File cannot be read");
  });

  it("runs toggleQrReaderVisible when `Scan QR Code` is pressed", () => {
    const toggleQrReaderVisible = jest.fn();
    const wrapper = shallow(<DefaultView hover={false} accept={true} toggleQrReaderVisible={toggleQrReaderVisible} />);
    const buttonElm = wrapper.find("[data-id='scan-qr-button']");
    buttonElm.simulate("click", {
      preventDefault: () => {},
      stopPropagation: () => {},
    });
    expect(toggleQrReaderVisible).toHaveBeenCalledTimes(1);
  });
});
