import { ErrorPage } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <ErrorPage title="404" description="Oops, page not found">
      <Link
        className="mt-4 inline-block px-8 py-4 bg-navy hover:bg-orange text-white hover:text-white border-none rounded-full font-semibold uppercase no-underline transition duration-300 ease-out text-sm"
        to="/"
      >
        Go back to home
      </Link>
    </ErrorPage>
  );
};
