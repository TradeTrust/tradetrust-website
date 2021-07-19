import { TileInfo, IconAddressBook, IconResolverAddress } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Page } from "../../components/Layout/Page";

export const SettingsPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta property="description" content="TradeTrust settings page." />
      <meta property="og:description" content="TradeTrust settings page." />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/settings`} />
      <title>TradeTrust - Settings</title>
    </Helmet>
    <Page title="Settings">
      <div className="mt-4">
        <Link to="/settings/address-book" className="inline-block">
          <TileInfo
            title="Address Book"
            description="Access and update your addresses"
            tileIcon={<IconAddressBook />}
          />
        </Link>
        <br />
        <Link to="/settings/address-resolver" className="inline-block">
          <TileInfo
            title="Address Book Resolver"
            description="Set up and add third party’s endpoint to resolve addresses’ identity"
            tileIcon={<IconResolverAddress />}
          />
        </Link>
      </div>
    </Page>
  </>
);
