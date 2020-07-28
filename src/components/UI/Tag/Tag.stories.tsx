import React from "react";
import { TagSolid, TagSolidTeal, TagSolidOrange, TagBordered, TagBorderedRed, TagBorderedRedLarge } from "./Tag";

export default {
  title: "UI/Tag",
  component: TagSolid,
  parameters: {
    componentSubtitle: "Types of Tags, Solid, Bordered.",
  },
};

export const Solid = () => {
  return <TagSolid>TagSolid</TagSolid>;
};

export const SolidTeal = () => {
  return <TagSolidTeal>TagSolid</TagSolidTeal>;
};

export const SolidOrange = () => {
  return <TagSolidOrange>TagSolid</TagSolidOrange>;
};

export const Bordered = () => {
  return <TagBordered>TagBordered</TagBordered>;
};

export const BorderedRed = () => {
  return <TagBorderedRed>TagBorderedRed</TagBorderedRed>;
};

export const BorderedRedLarge = () => {
  return <TagBorderedRedLarge>TagBorderedRedLarge</TagBorderedRedLarge>;
};
