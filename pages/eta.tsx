import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../src/utils/index";
import { NextPageProps } from "../src/types";

import { EtaPageContent } from "../src/components/EtaPageContent";

const EtaPage: NextPage<NextPageProps> = ({ headers }) => (
  <>
    <Head>
      <meta
        name="description"
        content="The Electronic Transactions Act (ETA) facilitates the use of e-commerce and e-transactions by giving e-contracts and e-signatures the same status as written contracts and signatures. Recent ETA amendments enable the creation and use of Electronic Transferable Records (ETRs), such as electrotonic Bills of Lading (eBLs)."
      />
      <meta
        property="og:description"
        content="The Electronic Transactions Act (ETA) facilitates the use of e-commerce and e-transactions by giving e-contracts and e-signatures the same status as written contracts and signatures. Recent ETA amendments enable the creation and use of Electronic Transferable Records (ETRs), such as electrotonic Bills of Lading (eBLs)."
      />
      <meta property="og:title" content="TradeTrust - Electronic Transactions Act" />
      <meta property="og:url" content={`${headers.host}/eta`} />
      <title>TradeTrust - Electronic Transactions Act</title>
    </Head>
    <EtaPageContent />
  </>
);

EtaPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default EtaPage;
