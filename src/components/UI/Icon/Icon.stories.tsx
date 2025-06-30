import React, { ReactElement } from "react";
import * as Icons from "./Icon";

export default {
  title: "UI/Icon",
  component: Icons,
  parameters: {
    componentSubtitle: "Types of icons used.",
  },
};

export const AddressBook = (): ReactElement => {
  return <Icons.IconAddressBook />;
};

export const ResolverAddress = (): ReactElement => {
  return <Icons.IconResolverAddress />;
};

export const Success = (): ReactElement => {
  return <Icons.IconSuccess className="text-forest-500" />;
};
export const Error = (): ReactElement => {
  return <Icons.IconError />;
};
export const AddFile = (): ReactElement => {
  return <Icons.IconAddFile />;
};
