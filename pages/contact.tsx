import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../src/utils/index";
import { NextPageProps } from "../src/types";

import { Page } from "../src/components/Layout/Page";
import { ContactUs } from "../src/components/ContactUs";
import { EmailForm } from "../src/components/EmailForm";

const ContactPage: NextPage<NextPageProps> = ({ headers }) => (
  <>
    <Head>
      <meta name="description" content="Get in touch by joining TradeTrust and be part of the TradeTrust network." />
      <meta
        property="og:description"
        content="Get in touch by joining TradeTrust and be part of the TradeTrust network."
      />
      <meta property="og:title" content="TradeTrust - Contact Us" />
      <meta property="og:url" content={`${headers.host}/contact`} />
      <title>TradeTrust - Contact Us</title>
    </Head>
    <Page title="Contact Us">
      <ContactUs>
        <EmailForm />
      </ContactUs>
    </Page>
  </>
);

ContactPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default ContactPage;
