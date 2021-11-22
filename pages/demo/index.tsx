import React from "react";
import { NextPage } from "next";

import dynamic from "next/dynamic";
import { Page } from "../../src/components/Layout/Page";
import { DemoLayout } from "../../src/components/Demo/DemoLayout";
import { NextSeo } from "next-seo";
import { SEO_DEMO } from "../../src/common/utils/seo";
const DemoContent = dynamic<{}>(() => import("../../src/components/Demo/DemoContent").then((mod) => mod.DemoContent), {
  ssr: false,
});

const DemoPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_DEMO} />
      <Page title="Demo">
        <DemoLayout>
          <DemoContent />
        </DemoLayout>
      </Page>
    </>
  );
};

export default DemoPage;
