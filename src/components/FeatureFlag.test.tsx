import { mount } from "enzyme";
import React from "react";
import { FeatureFlag } from "./FeatureFlag";
import { useFeatureFlagOverride } from "../common/hooks/useFeatureFlagOverride";

jest.mock("../config/feature-toggle.json", () => ({
  MANAGE_ASSET: {
    development: true,
  },
  JOB_POST: {
    development: false,
  },
}));

const mockUseFeatureFlagOverride = useFeatureFlagOverride as jest.Mock;
const mockGetFeature = jest.fn();

jest.mock("../common/hooks/useFeatureFlagOverride");

describe("featureFlag", () => {
  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    mockUseFeatureFlagOverride.mockReturnValue({ getFeatureFlagOverride: mockGetFeature });
    mockGetFeature.mockReturnValue(undefined);
  });

  describe("without overridden feature flag", () => {
    it("should follow default behavior when override is not present", () => {
      const wrapperJob = mount(
        <FeatureFlag name="JOB_POST">
          <div>Job post</div>
        </FeatureFlag>
      );
      expect(wrapperJob.find("div").length).toBe(0);

      const wrapperAsset = mount(
        <FeatureFlag name="MANAGE_ASSET">
          <div>Manage asset</div>
        </FeatureFlag>
      );
      expect(wrapperAsset.find("div").text()).toStrictEqual("Manage asset");
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
        <FeatureFlag name="JOB_POST" fallback={fallback}>
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
      const wrapper = mount(<FeatureFlag name="JOB_POST" />);
      expect(wrapper.find("div")).toHaveLength(0);
    });
  });
  describe("without overridden feature flag", () => {
    it("should render component when override is true", () => {
      mockGetFeature.mockReturnValue(true);

      const wrapperJob = mount(
        <FeatureFlag name="JOB_POST">
          <div>Job post</div>
        </FeatureFlag>
      );
      expect(wrapperJob.find("div").text()).toStrictEqual("Job post");

      const wrapperAsset = mount(
        <FeatureFlag name="MANAGE_ASSET">
          <div>Manage asset</div>
        </FeatureFlag>
      );
      expect(wrapperAsset.find("div").text()).toStrictEqual("Manage asset");
    });
    it("should not render component when override is false", () => {
      mockGetFeature.mockReturnValue(false);

      const wrapperJob = mount(
        <FeatureFlag name="JOB_POST">
          <div>Job post</div>
        </FeatureFlag>
      );
      expect(wrapperJob.find("div").length).toBe(0);

      const wrapperAsset = mount(
        <FeatureFlag name="MANAGE_ASSET">
          <div>Manage asset</div>
        </FeatureFlag>
      );
      expect(wrapperAsset.find("div").length).toBe(0);
    });
  });
});
