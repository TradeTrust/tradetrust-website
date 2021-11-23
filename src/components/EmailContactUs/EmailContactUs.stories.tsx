import React from "react";
import { EmailContactUsSuccess, EmailContactUsError } from "./EmailContactUs";
import { ContactUs } from "../../pages/contact";
export default {
  title: "Email/EmailState",
  component: EmailContactUsSuccess,
  parameters: {
    componentSubtitle: "Shown when Email success.",
  },
};

export const Success = () => {
  return (
    <ContactUs>
      <EmailContactUsSuccess />
    </ContactUs>
  );
};

export const Error = () => {
  return (
    <ContactUs>
      <EmailContactUsError />
    </ContactUs>
  );
};
