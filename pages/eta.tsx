import React from "react";
import { NextPage } from "next";

import { EtaPageContent } from "../src/components/EtaPageContent";
import { NextSeo } from "next-seo";
import { SEO_ETA } from "../src/common/utils/seo";

const EtaPage: NextPage = () => (
  <>
    <NextSeo {...SEO_ETA} />
    <EtaPageContent />
  </>
);

export default EtaPage;
