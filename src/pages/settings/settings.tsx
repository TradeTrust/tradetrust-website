import { TileInfo } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const SettingsPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta property="description" content="TradeTrust settings page." />
      <meta property="og:description" content="TradeTrust settings page." />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/settings`} />
      <title>TradeTrust - Settings</title>
    </Helmet>
    <div className="container py-8">
      <h3>Settings</h3>
      <div className="my-4">
        <Link to="/settings/address-book">
          <TileInfo title="Address Book" description="Access and update your addresses" />
        </Link>
        <br />
        <Link to="/settings/address-resolver">
          <TileInfo
            title="Address Book Resolver"
            description="Set up and add third party’s endpoint to resolve addresses’ identity"
          />
        </Link>
      </div>
    </div>
  </>
);
