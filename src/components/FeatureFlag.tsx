import React from "react";
import Features from "../config/feature-toggle.json";

interface FeatureFlagProps {
  name: string;
  render?: () => React.ReactElement;
  fallback?: () => React.ReactElement;
}

interface FeatureJson {
  [key: string]: any;
}

export const FeatureFlag = ({ name, render, fallback }: FeatureFlagProps): React.ReactElement | null => {
  const environment = process.env.NODE_ENV || "production";
  const features = Features as FeatureJson;
  const featureFlag: boolean = features?.[name]?.[environment];

  if (featureFlag && render) {
    return render();
  }
  if (!featureFlag && fallback) {
    return fallback();
  }
  return null;
};
