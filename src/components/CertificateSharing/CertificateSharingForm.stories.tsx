import React from "react";
import { CertificateSharingForm } from "./CertificateSharingForm";

export default {
  title: "UI/CertificateSharingForm",
  component: CertificateSharingForm,
  parameters: {
    componentSubtitle: "Sharing by email.",
  },
};

export const Default = () => {
  return <CertificateSharingForm />;
};
