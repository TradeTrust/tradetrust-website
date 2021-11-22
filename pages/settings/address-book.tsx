import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import Link from "next/link";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";
import { AddressBook, BackArrow } from "@govtechsg/tradetrust-ui-components";

const SettingsAddressBookPage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta property="description" content="Add a local address book to resolve addresses." />
        <meta property="og:description" content="a local address book to resolve addresses." />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${headers.host}/settings/address-book`} />
        <title>TradeTrust - Address Book</title>
      </Head>
      <div className="container py-8">
        <Link href="/settings">
          <a>
            <BackArrow />
          </a>
        </Link>
        <div className="flex-1 flex-col">
          <h2 className="font-ubuntu text-4xl text-cloud-900">Address Book</h2>
          <p className="mb-5 text-cloud-900">Please select an address book to view. </p>
        </div>
        <AddressBook className="py-6" network="ropsten" />
      </div>
    </>
  );
};

SettingsAddressBookPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default SettingsAddressBookPage;
