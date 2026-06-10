import React, { FunctionComponent } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { URLS } from "../../constants";

export const LoadDemoCertificate: FunctionComponent = () => {
  return (
    <div className="text-center">
      <div>
        <h3 className="text-xl font-gilroy-bold">No TradeTrust Document?</h3>
      </div>
      <div className="flex flex-col xs:flex-row justify-center gap-2 mt-4">
        <Button
          className="bg-white rounded-xl border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200 w-full xs:w-72"
          onClick={async (e) => {
            e.preventDefault();
            window.open(URLS.GALLERY, "_blank");
          }}
        >
          View Demo TradeTrust Document
        </Button>
        <Link
          className="w-full xs:w-72 box-border transition-colors duration-200 ease-out cursor-pointer font-gilroy-bold border p-2 rounded-xl min-h-10 bg-white border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200 flex items-center justify-center"
          to="/creator"
        >
          Create TradeTrust Document
        </Link>
      </div>
    </div>
  );
};
