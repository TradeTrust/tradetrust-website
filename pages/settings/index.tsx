import React from "react";
import { NextPage } from "next";
import Link from "next/link";

import { Page } from "../../src/components/Layout/Page";

import { TileInfo, TileInfoProps, IconAddressBook, IconResolverAddress } from "@govtechsg/tradetrust-ui-components";
import { NextSeo } from "next-seo";
import { SEO_SETTINGS } from "../../src/common/utils/seo";

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

const SettingsPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_SETTINGS} />
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

export default SettingsPage;
