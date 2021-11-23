import React from "react";
import { NextPage } from "next";

import { Page } from "../../src/components/Layout/Page";
import { ContactUs } from "../../src/components/ContactUs";
import { EmailContactUsSuccess } from "../../src/components/EmailContactUs";
import { NextSeo } from "next-seo";
import { SEO_EMAIL_SUCCESS } from "../../src/common/utils/seo";

const EmailSuccessPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_EMAIL_SUCCESS} />
      <Page title="Contact Us">
        <ContactUs>
          <EmailContactUsSuccess />
        </ContactUs>
      </Page>
    </>
  );
};

export default EmailSuccessPage;
