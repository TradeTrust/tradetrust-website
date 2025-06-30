import React, { ReactElement } from "react";
import { BackArrow, TileInfo } from "./Nav";
import { IconAddressBook } from "../Icon";

export default {
  title: "UI/Nav",
  component: TileInfo,
  parameters: {
    componentSubtitle: "Types of Links, with custom parameters.",
  },
};

export const BackArrowLink = (): ReactElement => {
  return <BackArrow />;
};

export const TileInfoLink = (): ReactElement => {
  return (
    <TileInfo title="Address Book" description="Access and update your addresses" tileIcon={<IconAddressBook />} />
  );
};
