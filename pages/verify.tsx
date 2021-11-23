import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

import { Page } from "../src/components/Layout/Page";
import { NextSeo } from "next-seo";
import { SEO_VERIFY } from "../src/common/utils/seo";
const DropZoneSectionContainer = dynamic<{}>(
  () => import("../src/components/VerifyPageContent/DropZoneSection").then((mod) => mod.DropZoneSectionContainer),
  {
    ssr: false,
  }
);

const VerifyPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_VERIFY} />
      <Page title="Verify Documents">
        <DropZoneSectionContainer />
      </Page>
    </>
  );
};

export default VerifyPage;
