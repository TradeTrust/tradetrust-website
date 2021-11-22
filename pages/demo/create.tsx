import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";
import { Page } from "../../src/components/Layout/Page";
import { DemoCreateProvider } from "../../src/components/Demo/DemoCreate/contexts/DemoCreateContext";
import { DemoLayout } from "../../src/components/Demo/DemoLayout";

const DemoCreate = dynamic(() => import("../../src/components/Demo/DemoCreate"), { ssr: false });

const DemoCreatePage: NextPage<NextPageProps> = ({ headers }) => {
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
        <meta property="og:url" content={`${headers.host}/demo-create`} />
        <title>TradeTrust - Demo Create</title>
      </Head>
      <Page title="Demo Create">
        <DemoLayout>
          <DemoCreateProvider>
            <DemoCreate />
          </DemoCreateProvider>
        </DemoLayout>
      </Page>
    </>
  );
};

DemoCreatePage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default DemoCreatePage;
