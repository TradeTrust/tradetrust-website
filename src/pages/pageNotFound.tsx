import { Page404 } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const PageNotFound: FunctionComponent = () => {
  return (
    <Page404>
      <h3 className="font-ubuntu font-normal w-60 sm:w-80 my-2 sm:my-4 text-lg sm:text-2xl">
        Go to
        <Link className="text-cerulean-200" to="/">
          {" "}
          Homepage
        </Link>
        ?
      </h3>
    </Page404>
  );
};
