import React from "react";
import { Helmet } from "react-helmet";
import { AddressResolver } from "../components/AddressResolver";

export const SettingsPage = () => (
  <>
    <Helmet>
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:description" content="Add Tradetrust description" />
      <meta property="og:url" content={`${window.location.origin}/settings`} />
      <title>TradeTrust - Settings</title>
    </Helmet>
    <AddressResolver />
  </>
);
