import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";
import { AddressResolver, BackArrow } from "@govtechsg/tradetrust-ui-components";

const SettingsAddressResolverPage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta property="description" content="Add third party’s endpoint to resolve addresses." />
        <meta property="og:description" content="Add third party’s endpoint to resolve addresses." />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${headers.host}/settings/address-resolver`} />
        <title>TradeTrust - Address Resolver</title>
      </Head>
      <div className="container py-8">
        <Link href="/settings">
          <a>
            <BackArrow />
          </a>
        </Link>
        <div className="flex-1 flex-col">
          <h2 className="font-ubuntu text-4xl text-cloud-900">Resolver: Address</h2>
          <p className="mb-5 text-cloud-900">Add third party’s endpoint to resolve addresses.</p>
        </div>
        <AddressResolver />
      </div>
    </>
  );
};

SettingsAddressResolverPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default SettingsAddressResolverPage;
