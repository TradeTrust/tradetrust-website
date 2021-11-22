import React from "react";
import { NextPage } from "next";

import { Page } from "../src/components/Layout/Page";
import { ContactUs } from "../src/components/ContactUs";
import { EmailForm } from "../src/components/EmailForm";
import { NextSeo } from "next-seo";
import { SEO_CONTACT } from "../src/common/utils/seo";

const ContactPage: NextPage = () => (
  <>
    <NextSeo {...SEO_CONTACT} />
    <Page title="Contact Us">
      <ContactUs>
        <EmailForm />
      </ContactUs>
    </Page>
  </>
);

export default ContactPage;
