import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../src/utils/index";
import { NextPageProps } from "../src/types";

import { HomePageContainer } from "../src/components/HomePageContent";

const HomePage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta
          property="og:description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={headers.host} />
        <title>TradeTrust - An easy way to check and verify your documents</title>
      </Head>
      <HomePageContainer />
    </>
  );
};

HomePage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default HomePage;
