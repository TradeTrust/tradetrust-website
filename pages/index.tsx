import React from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { SEO_HOME } from "../src/common/utils/seo";

import { HomePageContainer } from "../src/components/HomePageContent";

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_HOME} />
      <HomePageContainer />
    </>
  );
};

export default HomePage;
