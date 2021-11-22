import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";
import { Page } from "../../src/components/Layout/Page";

const DemoVerify = dynamic(() => import("../../src/components/Demo/DemoVerify"), { ssr: false });

const DemoVerifyPage: NextPage<NextPageProps> = ({ headers }) => {
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
        <meta property="og:url" content={`${headers.host}/demo/verify`} />
        <title>TradeTrust - Demo Verify</title>
      </Head>
      <Page title="Verify Demo Documents">
        <DemoVerify />
      </Page>
    </>
  );
};

DemoVerifyPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default DemoVerifyPage;
