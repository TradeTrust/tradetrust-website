import React from "react";
import { Drawer } from "./Drawer";

export default {
  title: "UI/Drawer",
  component: Drawer,
  parameters: {
    componentSubtitle: "Drawer for document tabs.",
  },
};

export const Default = () => {
  return (
    <Drawer
      templates={[
        { id: "certificate", label: "Certificate" },
        { id: "transcript", label: "Transcript" },
        { id: "media", label: "Media" },
      ]}
      selectedTemplate="custom"
      onSelectTemplate={() => {}}
    />
  );
};
