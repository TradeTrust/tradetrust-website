import { mount } from "enzyme";
import React from "react";
import { FeatureFlag } from "./FeatureFlag";

jest.mock("../config/feature-toggle.json", () => ({
  MANAGE_ASSET: {
    development: true
  },
  jobPost: {
    development: false
  }
}));

describe("featureFlag", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    process.env = { ...OLD_ENV };
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("should render component when MANAGE_ASSET feature flag is set to true", () => {
    const fallback = <div>This feature is not available</div>;
    const wrapper = mount(
      <FeatureFlag name="MANAGE_ASSET" fallback={fallback}>
        <div>Share link is active</div>
      </FeatureFlag>
    );
    expect(wrapper.find("div").text()).toStrictEqual("Share link is active");
  });
  it("should render fallback component when OTHER feature flag is set to false", () => {
    const fallback = <div>This feature is not available</div>;
    const wrapper = mount(
      <FeatureFlag name="jobPost" fallback={fallback}>
        <div>Other feature is active</div>
      </FeatureFlag>
    );
    expect(wrapper.find("div").text()).toStrictEqual("This feature is not available");
  });
  it("should render fallback component when EXTRA_FEATURE feature flag is not set", () => {
    const fallback = <div>This feature is not available</div>;
    const wrapper = mount(
      <FeatureFlag name="EXTRA_FEATURE" fallback={fallback}>
        <div>Extra feature is active</div>
      </FeatureFlag>
    );
    expect(wrapper.find("div").text()).toStrictEqual("This feature is not available");
  });
  it("should not render anything when there is no render function and MANAGE_ASSET feature flag is true", () => {
    const wrapper = mount(<FeatureFlag name="MANAGE_ASSET" />);
    expect(wrapper.find("div")).toHaveLength(0);
  });
  it("should not render anything when there is no fallback function and OTHER feature flag is false", () => {
    const wrapper = mount(<FeatureFlag name="jobPost" />);
    expect(wrapper.find("div")).toHaveLength(0);
  });
});
