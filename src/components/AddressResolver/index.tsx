import React, { useState } from "react";
import { Plus } from "react-feather";
import { ButtonSolidOrangeWhite } from "../UI/Button";
import { AddressesTable } from "./AddressesTable";

export const AddressResolver = () => {
  const [isNewEndpoint, setNewEndpoint] = useState(false);

  return (
    <div className="container py-12">
      <div className="flex items-end">
        <div className="w-full lg:flex-grow">
          <h1>Settings: Address Resolver</h1>
          <p className="mb-0 text-grey">Add third party’s endpoint to resolve addresses. </p>
        </div>
        <div className="w-auto lg:flex-grow">
          <ButtonSolidOrangeWhite
            className="my-3 lg:my-0"
            onClick={() => {
              setNewEndpoint(true);
            }}
            disabled={isNewEndpoint}
          >
            <div className="flex items-center">
              <div className="w-auto mr-2">
                <Plus />
              </div>
              <div className="w-auto">Add</div>
            </div>
          </ButtonSolidOrangeWhite>
        </div>
      </div>
      <AddressesTable isNewEndpoint={isNewEndpoint} setNewEndpoint={setNewEndpoint} />
    </div>
  );
};
