import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";
import { Page } from "../../src/components/Layout/Page";
import { ContactUs } from "../../src/components/ContactUs";
import { EmailContactUsSuccess } from "../../src/components/EmailContactUs";

const EmailSuccessPage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta property="description" content="Thank you for your email enquiry. We will get back to you shortly!" />
        <meta property="og:description" content="Thank you for your email enquiry. We will get back to you shortly!" />
        <meta property="og:title" content="TradeTrust - Email Success" />
        <meta property="og:url" content={`${headers.host}/email/success`} />
        <title>TradeTrust - An easy way to check and verify your documents</title>
      </Head>
      <Page title="Contact Us">
        <ContactUs>
          <EmailContactUsSuccess />
        </ContactUs>
      </Page>
    </>
  );
};

EmailSuccessPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default EmailSuccessPage;
