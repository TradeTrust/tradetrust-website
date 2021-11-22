import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";
import { Page } from "../../src/components/Layout/Page";
import { ContactUs } from "../../src/components/ContactUs";
import { EmailContactUsError } from "../../src/components/EmailContactUs";

const EmailErrorPage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta property="description" content="Oops, something is not right here, please try again." />
        <meta property="og:description" content="Oops, something is not right here, please try again." />
        <meta property="og:title" content="TradeTrust - Email error" />
        <meta property="og:url" content={`${headers.host}/email/error`} />
        <title>TradeTrust - An easy way to check and verify your documents</title>
      </Head>
      <Page title="Contact Us">
        <ContactUs>
          <EmailContactUsError />
        </ContactUs>
      </Page>
    </>
  );
};

EmailErrorPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default EmailErrorPage;
