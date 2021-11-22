import React from "react";
import { NextPage } from "next";
import { Page } from "../../src/components/Layout/Page";
import { ContactUs } from "../../src/components/ContactUs";
import { EmailContactUsError } from "../../src/components/EmailContactUs";
import { NextSeo } from "next-seo";
import { SEO_EMAIL_ERROR } from "../../src/common/utils/seo";

const EmailErrorPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_EMAIL_ERROR} />
      <Page title="Contact Us">
        <ContactUs>
          <EmailContactUsError />
        </ContactUs>
      </Page>
    </>
  );
};

export default EmailErrorPage;
