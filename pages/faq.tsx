import React from "react";
import { NextPage } from "next";

import { FaqContent } from "../src/components/FAQ/FaqContent";
import { Page } from "../src/components/Layout/Page";
import { NextSeo } from "next-seo";
import { SEO_FAQ } from "../src/common/utils/seo";

const FaqPage: NextPage = () => (
  <>
    <NextSeo {...SEO_FAQ} />
    <Page title="Frequently Asked Questions">
      <FaqContent />
    </Page>
  </>
);

export default FaqPage;
