import React from "react";
import { Loader, LoaderSkeleton, LoaderSpinner } from "./Loader";

export default {
  title: "UI/Loader",
  component: Loader,
  parameters: {
    componentSubtitle: "Types of loaders, with custom parameters.",
  },
};

export const Skeleton = () => {
  return <LoaderSkeleton />;
};

export const SkeletonCustomWidth = () => {
  return <LoaderSkeleton width="90px" />;
};

export const SkeletonLoaded = () => {
  return <LoaderSkeleton>Some text loaded.</LoaderSkeleton>;
};

export const Spinner = () => {
  return <LoaderSpinner />;
};

export const SpinnerCustomWidth = () => {
  return <LoaderSpinner width="90px" />;
};
