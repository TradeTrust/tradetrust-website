import { AddressResolver, BackArrow } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const SettingsAddressResolverPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta property="description" content="Add third party’s endpoint to resolve addresses." />
      <meta property="og:description" content="Add third party’s endpoint to resolve addresses." />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/settings/address-resolver`} />
      <title>TradeTrust - Address Resolver</title>
    </Helmet>
    <div className="container py-8">
      <Link to="/settings">
        <BackArrow />
      </Link>
      <AddressResolver />
    </div>
  </>
);
