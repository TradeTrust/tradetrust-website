// THIS COMPONENT IS TO BE REMOVED, FOR DEMO PURPOSES ONLY

import React, { useState } from "react";
import { isEmpty } from "lodash";
import { AddressResolvedDemo } from "./AddressResolvedDemo";
import { useAddressResolved } from "../../common/hooks/useAddressResolved";

const demoResolver = "https://demo-resolver.tradetrust.io/identifier/";
const demoResolverAddress1 = "0x0103e04ecaa67c4e5a8c6dc1ddda35340e2c6bc8";
const demoResolverAddress2 = "0xcbf8f9aaf7c8c07cb15fa32e9e08d8b675c79bc3";
const demoResolverAddress3 = "0x74306E2163d72BF2f3241dd5730893463433474F";

export const AddressesResolvedDemo = () => {
  const [address, setAddress] = useState("");
  const { addressResolved } = useAddressResolved();

  const onInputChanged = (event: any) => {
    setAddress(event.target.value);
  };

  return (
    <>
      <div className="row my-5">
        <div className="col-12">
          <b>Examples:</b>
          <div>{demoResolver} (endpoint)</div>
          <div>
            <span>{demoResolverAddress1} </span>
            <span>
              (
              <a href={demoResolver + demoResolverAddress1} target="_blank" rel="noreferrer noopener">
                endpoint response
              </a>
              )
            </span>
          </div>
          <div>
            <span>{demoResolverAddress2} </span>
            <span>
              (
              <a href={demoResolver + demoResolverAddress2} target="_blank" rel="noreferrer noopener">
                endpoint response
              </a>
              )
            </span>
          </div>
          <div>
            <span>{demoResolverAddress3} </span>
            <span>
              (
              <a href={demoResolver + demoResolverAddress3} target="_blank" rel="noreferrer noopener">
                endpoint response
              </a>
              )
            </span>
            <span> [not resolved]</span>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12">
          <b>AddressesResolvedDemo:</b>
          <div className="row align-items-center">
            <div className="col-4">
              <input
                className="w-100 p-1"
                type="text"
                onChange={onInputChanged}
                value={address}
                placeholder="Input address to resolve"
              />
            </div>
            <div className="col-auto">
              <AddressResolvedDemo address={address} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <p className="mt-4 mb-2">ADDRESS_RESOLVER (localStorage)</p>
          {isEmpty(addressResolved) ? (
            <div>No addresses found from local addressbook or resolved from api.</div>
          ) : (
            Object.keys(addressResolved).map((key) => {
              const name = addressResolved[key];
              const address = key;

              return (
                <div key={key}>
                  {address} : <b>{name}</b>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
