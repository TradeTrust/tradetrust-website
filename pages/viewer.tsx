import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../src/utils/index";
import { NextPageProps } from "../src/types";

import dynamic from "next/dynamic";

const ViewerPageContainer = dynamic(() => import("../src/components/ViewerPageContainer"), { ssr: false });

const ViewerPage: NextPage<NextPageProps> = ({ headers }) => {
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
        <meta property="og:url" content={`${headers.host}/viewer`} />
        <title>TradeTrust - Viewer</title>
      </Head>
      <ViewerPageContainer />
    </>
  );
};

ViewerPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default ViewerPage;
