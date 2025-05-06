import { useIdentifierResolver } from "@tradetrust-tt/address-identity-resolver";
import React, { FunctionComponent } from "react";

export const MessageAddressResolver: FunctionComponent<{ address: string }> = ({ address }) => {
  const { identityName } = useIdentifierResolver(address);
  return <p>{identityName || address}</p>;
};
