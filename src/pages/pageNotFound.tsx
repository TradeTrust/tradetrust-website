import { ErrorPage } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const PageNotFound: FunctionComponent = () => {
  return (
    <ErrorPage title="404" description="Oops, page not found">
      <Link
        className="mt-4 inline-block px-8 py-4 bg-cerulean-50 hover:bg-tangerine-600 text-white hover:text-white border-none rounded-full font-semibold uppercase no-underline transition duration-300 ease-out text-sm"
        to="/"
      >
        Go back to home
      </Link>
    </ErrorPage>
  );
};
