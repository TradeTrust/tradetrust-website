import React, { FunctionComponent } from "react";
import { BackModal } from "./BackModal";

export default {
  title: "DynamicForm/BackModal",
  component: BackModal,
  parameters: {
    componentSubtitle: "Modal for confirming abortion of document creation.",
  },
};

export const Default: FunctionComponent = () => (
  <BackModal
    backToFormSelection={() => alert("Returning to form selection")}
    show={true}
    closeBackModal={() => alert("Closing modal")}
  />
);
