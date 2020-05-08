import React from "react";
import { AddressEndpoints } from "./AddressEndpoints";
import { AddressResolved } from "./AddressResolved";
import { AddEndpoint } from "./AddEndpoint";

export const AddressResolver = () => {
  const apiSwift = "/static/api-swift.json";
  const apiNDI = "/static/api-ndi.json";
  const apiDnB = "/static/api-dnb.json";

  return (
    <div className="container-custom">
      <div className="row my-4">
        <div className="col-12">
          <b>Examples:</b>
          <br />
          /static/api-swift.json (
          <a href={apiSwift} target="_blank" rel="noreferrer noopener">
            endpoint response
          </a>
          )
          <br />
          /static/api-ndi.json (
          <a href={apiNDI} target="_blank" rel="noreferrer noopener">
            endpoint response
          </a>
          )
          <br />
          /static/api-dnb.json (
          <a href={apiDnB} target="_blank" rel="noreferrer noopener">
            endpoint response
          </a>
          )
        </div>
      </div>
      <AddEndpoint />
      <AddressEndpoints />
      <AddressResolved />
    </div>
  );
};
