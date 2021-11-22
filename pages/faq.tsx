import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../src/utils/index";
import { NextPageProps } from "../src/types";

import { FaqContent } from "../src/components/FAQ/FaqContent";
import { Page } from "../src/components/Layout/Page";

// need fix
const FaqPage: NextPage<NextPageProps> = ({ headers }) => (
  <>
    <Head>
      <meta
        name="description"
        content="Have some questions in mind? Here are a list of collated questions and answers that might answer your questions."
      />
      <meta
        property="og:description"
        content="Have some questions in mind? Here are a list of collated questions and answers that might answer your questions."
      />
      <meta property="og:title" content="TradeTrust - Frequently Asked Questions" />
      <meta property="og:url" content={`${headers.host}/faq`} />
      <title>TradeTrust - Frequently Asked Questions</title>
    </Head>
    <Page title="Frequently Asked Questions">
      <FaqContent />
    </Page>
  </>
);

FaqPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default FaqPage;
