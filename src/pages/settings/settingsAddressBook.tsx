import { AddressBook, BackArrow } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const SettingsAddressBookPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta property="description" content="Add a local address book to resolve addresses." />
      <meta property="og:description" content="a local address book to resolve addresses." />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/settings/address-book`} />
      <title>TradeTrust - Address Book</title>
    </Helmet>
    <div className="container py-8">
      <Link to="/settings">
        <BackArrow />
      </Link>
      <h3>Settings: Address Book</h3>
      <p className="text-grey">Please select an address book to view. </p>
      <AddressBook className="py-6" network="ropsten" />
    </div>
  </>
);
