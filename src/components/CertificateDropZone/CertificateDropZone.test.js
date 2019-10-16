import React from "react";
import { shallow } from "enzyme";
import { DropzoneContent } from "./CertificateDropZone";
import DefaultView from "./Views/DefaultView";
import UnverifiedView from "./Views/UnverifiedView";
import VerifyingView from "./Views/VerifyingView";

it("renders DefaultView by default", () => {
  const wrapper = shallow(<DropzoneContent />);
  expect(wrapper.find(DefaultView).length).toBe(1);
});

it("renders UnverifiedView after verification resolves and is not valid", () => {
  const wrapper = shallow(
    <DropzoneContent
      verificationStatus={{
        valid: false
      }}
    />
  );
  expect(wrapper.find(UnverifiedView).length).toBe(1);
});

it("renders VerifyingView during verification", () => {
  const wrapper = shallow(<DropzoneContent verifying={true} />);
  expect(wrapper.find(VerifyingView).length).toBe(1);
});
