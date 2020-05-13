import React from "react";
import { useIdentifierResolver } from "./../../common/hooks/useIdentifierResolver";

export const AddressResolved = ({ address }: { address: string }) => {
  const { resolvedIdentifier } = useIdentifierResolver(address);
  // console.log({}, resolvedIdentifier);
  return (
    <div>
      {address} : <b>{resolvedIdentifier}</b>
    </div>
  );
};
