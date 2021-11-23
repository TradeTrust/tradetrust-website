import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

import { ViewerPageContainerProps } from "../../src/components/ViewerPageContainer";
import { NextSeo } from "next-seo";
import { SEO_VIEWER } from "../../src/common/utils/seo";
import { usePrivateRoute } from "../../src/common/hooks/usePrivateRoute";

const ViewerPageContainer = dynamic<ViewerPageContainerProps>(
  () => import("../../src/components/ViewerPageContainer").then((mod) => mod.ViewerPageContainer),
  { ssr: false }
);

const DemoViewerPage: NextPage = () => {
  usePrivateRoute();
  return (
    <>
      <NextSeo {...SEO_VIEWER} />
      <ViewerPageContainer isMagicDemo />
    </>
  );
};

export default DemoViewerPage;
