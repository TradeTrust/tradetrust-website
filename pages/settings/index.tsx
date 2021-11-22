import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";
import { Page } from "../../src/components/Layout/Page";

import { TileInfo, TileInfoProps, IconAddressBook, IconResolverAddress } from "@govtechsg/tradetrust-ui-components";

interface SettingsOptions extends TileInfoProps {
  pathLink: string;
}

const settingsOptions: SettingsOptions[] = [
  {
    title: "Address Book",
    description: "Access and update your addresses",
    tileIcon: <IconAddressBook className="max-w-full" />,
    pathLink: "/settings/address-book",
  },
  {
    title: "Address Book Resolver",
    description: "Set up and add third party’s endpoint to resolve addresses’ identity",
    tileIcon: <IconResolverAddress className="max-w-full" />,
    pathLink: "/settings/address-resolver",
  },
];

const SettingsPage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta property="description" content="TradeTrust settings page." />
        <meta property="og:description" content="TradeTrust settings page." />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${headers.host}/settings`} />
        <title>TradeTrust - Settings</title>
      </Head>
      <Page title="Settings">
        <div className="flex flex-col flex-wrap mt-4 md:flex-row">
          {settingsOptions.map((details, index) => (
            <div className="mr-4 mb-4" key={index}>
              <Link href={details.pathLink}>
                <a className="inline-block">
                  <TileInfo title={details.title} description={details.description} tileIcon={details.tileIcon} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </Page>
    </>
  );
};

SettingsPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default SettingsPage;
