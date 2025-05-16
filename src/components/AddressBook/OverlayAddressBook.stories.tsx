import React, { FunctionComponent, ReactElement } from "react";
import { Overlay } from "../UI/Overlay";
import { OverlayAddressBook } from "./AddressBook";
import { OverlayContextProvider, useOverlayContext } from "../../common/contexts/OverlayContext";
import { Button } from "../Button";

export default {
  title: "AddressBook/OverlayAddressBook",
  component: OverlayAddressBook,
};

export interface OverlayDemoProps {
  buttonText: string;
  children: React.ReactNode;
}

const OverlayDemo: FunctionComponent<OverlayDemoProps> = ({ buttonText, children }) => {
  const { showOverlay } = useOverlayContext();

  return (
    <>
      <Overlay />
      <Button onClick={() => showOverlay(children)}>{buttonText}</Button>
    </>
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
    <OverlayContextProvider>
      <OverlayDemo buttonText="Populated third party address book">
        <OverlayAddressBook
          onAddressSelected={(address) => window.alert(`${address} was selected!`)}
          network="goerli"
          title="Address Book"
        />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};
