import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../src/utils/index";
import { NextPageProps } from "../src/types";
import dynamic from "next/dynamic";

import { Page } from "../src/components/Layout/Page";
const DropZoneSectionContainer = dynamic(() => import("../src/components/VerifyPageContent/DropZoneSection"), {
  ssr: false,
});

const VerifyPage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta
          property="description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta
          property="og:description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${headers.host}/verify`} />
        <title>TradeTrust - Verify</title>
      </Head>
      <Page title="Verify Documents">
        <DropZoneSectionContainer />
      </Page>
    </>
  );
};

VerifyPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default VerifyPage;
