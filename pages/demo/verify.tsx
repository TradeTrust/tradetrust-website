import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

import { Page } from "../../src/components/Layout/Page";
import { NextSeo } from "next-seo";
import { SEO_DEMO_VERIFY } from "../../src/common/utils/seo";

const DemoVerify = dynamic<{}>(() => import("../../src/components/Demo/DemoVerify").then((mod) => mod.DemoVerify), {
  ssr: false,
});

const DemoVerifyPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_DEMO_VERIFY} />
      <Page title="Verify Demo Documents">
        <DemoVerify />
      </Page>
    </>
  );
};

export default DemoVerifyPage;
