import React, { FunctionComponent } from "react";
import { ErrorPage } from "./ErrorPage";

export default {
  title: "Error/ErrorPage",
  component: ErrorPage,
  parameters: {
    componentSubtitle: "General error page",
  },
};

export const Default: FunctionComponent = () => {
  return (
    <ErrorPage
      pageTitle="ERROR"
      header="Something Went Wrong"
      description="There is an error with this document, please contact your issuing institution."
      image={"/static/images/errorpage/error-boundary.png"}
    >
      <h3 className="font-normal my-2 sm:my-4 text-lg sm:text-2xl">
        Go to
        <a className="text-cerulean-500" href="/">
          {" "}
          Homepage
        </a>
        ?
      </h3>
    </ErrorPage>
  );
};

export const Page404: FunctionComponent = () => {
  return (
    <ErrorPage
      pageTitle="ERROR 404"
      header="Oops!"
      description="The page you are trying to reach doesn't seem to exist."
      image={"/static/images/errorpage/404.png"}
    >
      <h3 className="font-normal my-2 sm:my-4 text-lg sm:text-2xl">
        Go to
        <a className="text-cerulean-500" href="/">
          {" "}
          Homepage
        </a>
        ?
      </h3>
    </ErrorPage>
  );
};
