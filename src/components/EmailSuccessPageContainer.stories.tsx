import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { EmailSuccessPageContainer } from "./EmailSuccessPageContainer";

export default {
  title: "Email/EmailSuccessPageContainer",
  component: EmailSuccessPageContainer,
  parameters: {
    componentSubtitle: "Shown when Email success.",
  },
};

export const Default = () => {
  return (
    <Router>
      <EmailSuccessPageContainer />
    </Router>
  );
};
