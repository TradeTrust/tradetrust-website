import React, { FunctionComponent, ReactElement } from "react";
import Features from "../config/feature-toggle.json";

interface FeatureFlag {
  name: string;
  fallback?: React.ReactElement;
}

interface FeatureJson {
  [key: string]: any;
}

export const FeatureFlag: FunctionComponent<FeatureFlag> = ({ name, children, fallback }) => {
  const environment = process.env.NODE_ENV || "production";
  const features = Features as FeatureJson;
  const featureFlag: boolean = features?.[name]?.[environment];

  if (featureFlag && children) {
    // Casting because of incompatibility of ReactNode with FunctionComponent
    // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return children as ReactElement;
  }
  if (!featureFlag && fallback) {
    return fallback;
  }
  return null;
};
