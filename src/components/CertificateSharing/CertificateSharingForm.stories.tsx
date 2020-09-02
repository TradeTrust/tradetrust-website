import React from "react";
import { CertificateSharingFormUnStyled, CertificateSharingForm } from "./CertificateSharingForm";

export default {
  title: "UI/CertificateSharingForm",
  component: CertificateSharingFormUnStyled,
  parameters: {
    componentSubtitle: "Sharing by email.",
  },
};

export const Default = () => {
  return <CertificateSharingForm />;
};
