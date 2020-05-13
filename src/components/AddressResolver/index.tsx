import React from "react";
import { AddressEndpoints } from "./AddressEndpoints";
import { AddressesResolvedDemo } from "./AddressesResolvedDemo";
import { AddEndpoint } from "./AddEndpoint";
import { AddressResolveDemo } from "./AddressResolveDemo";
// import { AddressesDemo } from "./AddressesDemo";

export const demoResolverAddress = "0x0103e04ecaa67c4e5a8c6dc1ddda35340e2c6bc8";
export const demoResolver = "https://demo-resolver.tradetrust.io/identifier/";

export const AddressResolver = () => {
  return (
    <div className="container-custom">
      {/* <AddressesDemo /> */}
      <div className="row my-4">
        <div className="col-12">
          <b>Examples:</b>
          <br />
          {demoResolver} (endpoint)
          <br />
          {demoResolver + demoResolverAddress} (
          <a href={demoResolver + demoResolverAddress} target="_blank" rel="noreferrer noopener">
            endpoint response
          </a>
          )
        </div>
      </div>
      <AddEndpoint />
      <AddressEndpoints />
      <AddressesResolvedDemo />
      {/* <AddressResolveDemo /> */}
    </div>
  );
};
