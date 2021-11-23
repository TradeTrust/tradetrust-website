import React from "react";
import { Banner } from "./Banner";

export default {
  title: "UI/Banner",
  component: Banner,
  parameters: {
    componentSubtitle: "Banners.",
  },
};

export const Default = () => {
  return <Banner title="Want to try creating a verifiable document? You will be surprised how easy it is." />;
};
