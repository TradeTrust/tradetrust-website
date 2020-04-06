import React, { FunctionComponent, ReactElement } from "react";
import { useFeatureFlagOverride } from "../common/hooks/useFeatureFlagOverride";
import Features from "../config/feature-toggle.json";

interface FeatureFlag {
  name: string;
  fallback?: React.ReactElement;
}

type Environment = "development" | "production";

interface EnvironmentToggle {
  development: boolean;
  production: boolean;
}

interface FeatureJson {
  [key: string]: EnvironmentToggle;
}

export const FeatureFlag: FunctionComponent<FeatureFlag> = ({ name, children, fallback }) => {
  const { getFeatureFlagOverride } = useFeatureFlagOverride();
  const override = getFeatureFlagOverride(name);
  // Combining allowing both test and development environment to render the development features
  const isDevelopment = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
  const environment: Environment = isDevelopment ? "development" : "production";
  const features = Features as FeatureJson;
  const featureFlag: boolean = features?.[name]?.[environment];

  // display the feature if the flag has been overridden
  // OR
  // if the flag HAS NOT been set to FALSE (override === undefined) and the flag is enabled
  if ((override || (featureFlag && override === undefined)) && children) {
    // Casting because of incompatibility of ReactNode with FunctionComponent
    // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return children as ReactElement;
  }
  if (!featureFlag && fallback) {
    return fallback;
  }
  return null;
};
