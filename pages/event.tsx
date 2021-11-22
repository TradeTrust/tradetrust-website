import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../src/utils/index";
import { NextPageProps } from "../src/types";

import { Page } from "../src/components/Layout/Page";
import { EventContent } from "../src/components/Event/EventContent";

// need fix
export const EventPage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta property="description" content="These are media events which TradeTrust has been involved in." />
        <meta property="og:description" content="These are media events which TradeTrust has been involved in." />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${headers.host}/media`} />
        <title>TradeTrust - Events</title>
      </Head>
      <Page title="Event">
        <EventContent />
      </Page>
    </>
  );
};

EventPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default EventPage;
