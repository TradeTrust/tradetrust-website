import React from "react";
import { NextPage } from "next";

import dynamic from "next/dynamic";
import { Page } from "../../src/components/Layout/Page";
import { DemoCreateProvider } from "../../src/components/Demo/DemoCreate/contexts/DemoCreateContext";
import { DemoLayout } from "../../src/components/Demo/DemoLayout";
import { NextSeo } from "next-seo";
import { SEO_DEMO_CREATE } from "../../src/common/utils/seo";
import { useAuthContext } from "../../src/common/contexts/AuthenticationContext";

const DemoCreate = dynamic<{}>(() => import("../../src/components/Demo/DemoCreate").then((mod) => mod.DemoCreate), {
  ssr: false,
});

const DemoCreatePage: NextPage = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <NextSeo {...SEO_DEMO_CREATE} />
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

export default DemoCreatePage;
