import React, { useState } from "react";
import { X } from "react-feather";
import { NETWORK } from "../../../config";

export const NetworkBar = () => {
  const [close, setClose] = useState(false);

  if (close || NETWORK === "mainnet") return null;

  return (
    <div className="bg-green-900 text-white py-2 px-0">
      <div className="container">
        <div className="flex">
          <div className="w-auto ml-auto">
            <p className="mb-0">
              You are currently on <span className="capitalize">{NETWORK}</span> network.
            </p>
          </div>
          <div className="w-auto ml-auto">
            <X className="cursor-pointer hover:text-grey" onClick={() => setClose(true)} />
          </div>
        </div>
      </div>
    </div>
  );
};
