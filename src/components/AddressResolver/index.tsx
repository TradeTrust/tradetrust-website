import React, { useState } from "react";
import { ButtonSolidOrangeWhite } from "../UI/Button";
import { SvgIcon, SvgIconPlus } from "../UI/SvgIcon";
import { AddressesTable } from "./AddressesTable";

export const AddressResolver = () => {
  const [isNewEndpoint, setNewEndpoint] = useState(false);

  return (
    <div className="container-custom py-5">
      <div className="row align-items-end">
        <div className="col-12 col-lg">
          <h1>Settings: Address Resolver</h1>
          <p className="mb-0 text-grey">Add third party’s endpoint to resolve addresses. </p>
        </div>
        <div className="col-12 col-lg-auto">
          <ButtonSolidOrangeWhite
            className="my-3 my-lg-0"
            onClick={() => {
              setNewEndpoint(true);
            }}
            disabled={isNewEndpoint}
          >
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
      <AddressesTable isNewEndpoint={isNewEndpoint} setNewEndpoint={setNewEndpoint} />
    </div>
  );
};
