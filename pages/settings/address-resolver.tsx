import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { SEO_ADDRESS_RESOLVER } from "../../src/common/utils/seo";
import { AddressResolver, BackArrow } from "@govtechsg/tradetrust-ui-components";

const SettingsAddressResolverPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_ADDRESS_RESOLVER} />
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

export default SettingsAddressResolverPage;
