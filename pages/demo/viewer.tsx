import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";

const ViewerPageContainer = dynamic(() => import("../../src/components/ViewerPageContainer"), { ssr: false });

const DemoViewerPage: NextPage<NextPageProps> = ({ headers }) => {
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
        <meta property="og:url" content={`${headers.host}/demo/viewer`} />
        <title>TradeTrust - Demo Viewer</title>
      </Head>
      <ViewerPageContainer isMagicDemo />
    </>
  );
};

DemoViewerPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default DemoViewerPage;
