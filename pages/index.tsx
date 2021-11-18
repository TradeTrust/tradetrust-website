import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { HomePageContainer } from "../src/components/HomePageContent";

interface HomePageProps {
  host: string;
}

const HomePage: NextPage<HomePageProps> = ({ host }) => {
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
        <meta property="og:url" content={host} />
        <title>TradeTrust - An easy way to check and verify your documents</title>
      </Head>
      <HomePageContainer />
    </>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const { req } = ctx;

  let host = "";

  if (req) {
    host = req.headers.host;
  }

  return { host };
};

export default HomePage;
