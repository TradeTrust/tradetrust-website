import React, { ReactElement } from "react";
import { AddressBook } from "./AddressBook";

export default {
  title: "AddressBook/AddressBook",
  component: AddressBook,
};

export const DefaultAddressBook = (): ReactElement => {
  localStorage.setItem("ADDRESS_BOOK", JSON.stringify({}));
  localStorage.setItem("ADDRESS_THIRD_PARTY_ENDPOINTS", JSON.stringify([]));

  return (
    <AddressBook
      network="goerli"
      onAddressSelect={(address: string) => {
        console.log(address);
      }}
    />
  );
};

export const PopulatedLocalAddressBook = (): ReactElement => {
  localStorage.setItem(
    "ADDRESS_BOOK",
    JSON.stringify({
      "0xa": "Name 1",
      "0xb": "Name 2",
      "0xc": "Name 3",
      "0xd": "Name 4",
      "0xe": "Name 5",
      "0xf": "Name 6",
      "0xg": "Name 7",
      "0xh": "Name 8",
      "0xi": "Name 9",
      "0xj": "Name 10",
      "0xk": "Name 11",
      "0xl": "Name 12",
      "0xm": "Name 13",
      "0xn": "Name 14",
      "0xo": "Name 15",
      "0xp": "Name 16",
      "0xq": "Name 17",
      "0xr": "Name 18",
      "0xs": "Name 19",
      "0xt": "Name 20",
      "0xu": "Name 21",
      "0xv": "Name 22",
      "0xw": "Name 23",
      "0xx": "Name 24",
      "0xy": "Name 25",
      "0xz": "Name 26",
    })
  );
  localStorage.setItem("ADDRESS_THIRD_PARTY_ENDPOINTS", JSON.stringify([]));

  return (
    <AddressBook
      onAddressSelect={(address: string) => {
        console.log(address);
      }}
      network="goerli"
    />
  );
};

export const PopulatedThirdpartyAddressBook = (): ReactElement => {
  localStorage.setItem(
    "ADDRESS_BOOK",
    JSON.stringify({
      "0xa": "Name 1",
      "0xb": "Name 2",
      "0xc": "Name 3",
      "0xd": "Name 4",
      "0xe": "Name 5",
      "0xf": "Name 6",
      "0xg": "Name 7",
      "0xh": "Name 8",
      "0xi": "Name 9",
      "0xj": "Name 10",
    })
  );
  localStorage.setItem(
    "ADDRESS_THIRD_PARTY_ENDPOINTS",
    JSON.stringify([
      {
        name: "demo 123",
        endpoint: "https://demo-resolver.tradetrust.io",
        apiHeader: "x-api-key",
        apiKey: "DEMO",
        path: { addressResolution: "/identifier", entityLookup: "/search" },
      },
    ])
  );

  return (
    <AddressBook
      onAddressSelect={(address: string) => {
        console.log(address);
      }}
      network="goerli"
    />
  );
};

export const ThirdpartyAddressBookNoEntityLookup = (): ReactElement => {
  localStorage.setItem(
    "ADDRESS_BOOK",
    JSON.stringify({
      "0xa": "Name 1",
      "0xb": "Name 2",
      "0xc": "Name 3",
      "0xd": "Name 4",
      "0xe": "Name 5",
      "0xf": "Name 6",
      "0xg": "Name 7",
      "0xh": "Name 8",
      "0xi": "Name 9",
      "0xj": "Name 10",
    })
  );
  localStorage.setItem(
    "ADDRESS_THIRD_PARTY_ENDPOINTS",
    JSON.stringify([
      {
        name: "demo 123",
        endpoint: "https://demo-resolver.tradetrust.io",
        apiHeader: "x-api-key",
        apiKey: "DEMO",
        path: { addressResolution: "/identifier" },
      },
    ])
  );

  return (
    <AddressBook
      onAddressSelect={(address: string) => {
        console.log(address);
      }}
      network="goerli"
    />
  );
};
