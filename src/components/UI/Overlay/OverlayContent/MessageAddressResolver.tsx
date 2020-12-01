import { useIdentifierResolver } from "@govtechsg/address-identity-resolver";
import React from "react";

export const MessageAddressResolver = ({ address }: { address: string }) => {
  const { identityName } = useIdentifierResolver(address);
  return <p>{identityName || address}</p>;
};
