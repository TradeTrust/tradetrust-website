import React from "react";
import { NextPage } from "next";

import { Page } from "../src/components/Layout/Page";
import { EventContent } from "../src/components/Event/EventContent";
import { NextSeo } from "next-seo";
import { SEO_EVENT } from "../src/common/utils/seo";

export const EventPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_EVENT} />
      <Page title="Event">
        <EventContent />
      </Page>
    </>
  );
};

export default EventPage;
