import React from "react";
import { Helmet } from "react-helmet";
import { ContactUs } from "./contact";
import { EmailContactUsSuccess } from "../components/EmailContactUs";

export const EmailSuccessPage = () => (
  <>
    <Helmet>
      <meta property="description" content="Thank you for your email enquiry. We will get back to you shortly!" />
      <meta property="og:description" content="Thank you for your email enquiry. We will get back to you shortly!" />
      <meta property="og:title" content="TradeTrust - Email Success" />
      <meta property="og:url" content={`${window.location.origin}/email/success`} />
      <title>TradeTrust - An easy way to check and verify your documents</title>
    </Helmet>
    <ContactUs>
      <EmailContactUsSuccess />
    </ContactUs>
  </>
);
