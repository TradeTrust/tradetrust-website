import React from "react";
import { Tag, TagBordered, TagBorderedSm, TagBorderedLg } from "./Tag";

export default {
  title: "UI/Tag",
  component: Tag,
  parameters: {
    componentSubtitle: "Types of Tags, Solid, Bordered.",
  },
};

export const SolidForest = () => {
  return <Tag className="text-white bg-forest-200">SolidDefault</Tag>;
};

export const BorderedWhite = () => {
  return (
    <TagBordered className="text-white border-white">BorderedWhite</TagBordered>
  );
};

export const BorderedScarlet = () => {
  return (
    <TagBordered className="text-scarlet-500 border-scarlet-500">
      TagBorderedScarlet
    </TagBordered>
  );
};

export const BorderedCloudSmall = () => {
  return (
    <TagBorderedSm className="text-cloud-800">BorderedCloudSmall</TagBorderedSm>
  );
};

export const BorderedScarletLarge = () => {
  return (
    <TagBorderedLg className="text-scarlet-500 border-scarlet-500">
      BorderedScarletLarge
    </TagBorderedLg>
  );
};
