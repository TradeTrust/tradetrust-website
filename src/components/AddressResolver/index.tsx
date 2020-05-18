import React, { useState } from "react";
import _uniqueId from "lodash/uniqueId";
import { ButtonSolidOrangeWhite } from "../UI/Button";
import { SvgIcon, SvgIconPlus } from "../UI/SvgIcon";
import { AddressesTable } from "./AddressesTable";
import { AddressesResolvedDemo } from "./AddressesResolvedDemo";

export interface NewEndpointsEntryProps {
  id: string;
}

export const AddressResolver = () => {
  const defaultnewEndpointsEntry: NewEndpointsEntryProps[] = [];
  const [newEndpointsEntries, setNewEndpointsEntries] = useState(defaultnewEndpointsEntry);

  const addNewEndpoint = () => {
    setNewEndpointsEntries([{ id: _uniqueId("api_") }, ...newEndpointsEntries]); // id to track as component key value
  };

  const removeNewEndpoint = (id: string) => {
    const filtered = newEndpointsEntries.filter((item) => {
      return item.id !== id;
    });
    setNewEndpointsEntries(filtered);
  };

  return (
    <div className="container-custom py-5">
      <div className="row align-items-end">
        <div className="col-12 col-lg">
          <h2>Settings: Address Resolver</h2>
          <p className="mb-0 text-grey">Add third party’s endpoint to resolve addresses. </p>
        </div>
        <div className="col-12 col-lg-auto">
          <ButtonSolidOrangeWhite className="my-3 my-lg-0" onClick={addNewEndpoint}>
            <div className="row align-items-center no-gutters">
              <div className="col-auto mr-2">
                <SvgIcon>
                  <SvgIconPlus />
                </SvgIcon>
              </div>
              <div className="col-auto">Add</div>
            </div>
          </ButtonSolidOrangeWhite>
        </div>
      </div>
      <AddressesTable newEndpointsEntries={newEndpointsEntries} removeNewEndpoint={removeNewEndpoint} />
      <AddressesResolvedDemo />
    </div>
  );
};
