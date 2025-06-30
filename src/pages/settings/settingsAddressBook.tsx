import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AddressBook } from "../../components/AddressBook";
import { BackArrow } from "../../components/UI/Nav";

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
      <div className="flex-1 flex-col">
        <h2 className="text-cloud-800">Address Book</h2>
        <p className="mb-5 text-cloud-800">Please select an address book to view. </p>
      </div>
      <AddressBook className="py-6" network="sepolia" />
    </div>
  </>
);
