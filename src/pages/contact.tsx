import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { EmailForm } from "./../components/EmailForm";

export const ContactUs: FunctionComponent = ({ children }) => {
  return (
    <div className="container py-12">
      <div className="flex mb-6">
        <div className="w-full">
          <h1>Contact Us</h1>
        </div>
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-3/5 px-4 mb-8 lg:mb-0">{children}</div>
        <div className="w-1/3 mx-auto lg:w-1/3 px-4 hidden lg:block">
          <img src="/static/images/contact/contact-person.png" alt="Person with form" />
        </div>
      </div>
    </div>
  );
};

export const ContactPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta name="description" content="Get in touch by joining TradeTrust and be part of the TradeTrust network." />
      <meta
        property="og:description"
        content="Get in touch by joining TradeTrust and be part of the TradeTrust network."
      />
      <meta property="og:title" content="TradeTrust - Contact Us" />
      <meta property="og:url" content={`${window.location.origin}/contact`} />
      <title>TradeTrust - Contact Us</title>
    </Helmet>
    <ContactUs>
      <EmailForm />
    </ContactUs>
  </>
);
