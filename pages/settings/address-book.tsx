import React from "react";
import { NextPage } from "next";

import Link from "next/link";

import { AddressBook, BackArrow } from "@govtechsg/tradetrust-ui-components";
import { NextSeo } from "next-seo";
import { SEO_ADDRESS_BOOK } from "../../src/common/utils/seo";

const SettingsAddressBookPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_ADDRESS_BOOK} />
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

export default SettingsAddressBookPage;
