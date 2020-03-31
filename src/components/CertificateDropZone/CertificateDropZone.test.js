import React from "react";
import { shallow } from "enzyme";
import { DropzoneContent } from "./CertificateDropZone";
import DefaultView from "./Views/DefaultView";
import UnverifiedView from "./Views/UnverifiedView";
import VerifyingView from "./Views/VerifyingView";

describe("dropzoneContent", () => {
  it("renders DefaultView by default", () => {
    const wrapper = shallow(<DropzoneContent />);
    expect(wrapper.find(DefaultView)).toHaveLength(1);
  });

  it("renders UnverifiedView after verification resolves and is not valid", () => {
    const wrapper = shallow(
      <DropzoneContent
        verificationStatus={{
          valid: false,
        }}
      />
    );
    expect(wrapper.find(UnverifiedView)).toHaveLength(1);
  });

  it("renders VerifyingView during verification", () => {
    const wrapper = shallow(<DropzoneContent verifying={true} />);
    expect(wrapper.find(VerifyingView)).toHaveLength(1);
  });
});
