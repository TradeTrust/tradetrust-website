import React, { FunctionComponent } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { URLS } from "../../constants";

export const LoadDemoCertificate: FunctionComponent = () => {
  return (
    <div className="text-center">
      <div>
        <h4>No TradeTrust Document?</h4>
      </div>
      <div className="flex flex-col xs:flex-row justify-center gap-2 mt-4">
        <Button
          className="bg-white rounded-xl border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200 w-full xs:w-72"
          onClick={async () => {
            window.location.href = URLS.GALLERY;
          }}
        >
          View Demo Tradetrust Document
        </Button>
        <Link className="w-full xs:w-72" to={"/creator"}>
          <Button className="bg-white rounded-xl border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200 w-full">
            Create Tradetrust Document
          </Button>
        </Link>
      </div>
    </div>
  );
};
