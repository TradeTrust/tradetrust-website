import React from "react";
import { shallow } from "enzyme";
import { DropzoneContent } from "./CertificateDropZone";
import { DefaultView } from "./Views/DefaultView";
import { VerifyingView } from "./Views/VerifyingView";
import { UnverifiedView } from "./Views/UnverifiedView";

describe("dropzoneContent", () => {
  it("renders DefaultView by default", () => {
    const wrapper = shallow(
      <DropzoneContent resetData={() => 0} toggleQrReaderVisible={() => 0} verificationStatus={{}} />
    );
    expect(wrapper.find(DefaultView)).toHaveLength(1);
  });

  it("renders UnverifiedView after verification resolves and is not valid", () => {
    const wrapper = shallow(
      <DropzoneContent
        resetData={() => 0}
        toggleQrReaderVisible={() => 0}
        verificationStatus={{
          valid: false
        }}
      />
    );
    expect(wrapper.find(UnverifiedView)).toHaveLength(1);
  });

  it("renders VerifyingView during verification", () => {
    const wrapper = shallow(
      <DropzoneContent verifying resetData={() => 0} toggleQrReaderVisible={() => 0} verificationStatus={{}} />
    );
    expect(wrapper.find(VerifyingView)).toHaveLength(1);
  });
});
