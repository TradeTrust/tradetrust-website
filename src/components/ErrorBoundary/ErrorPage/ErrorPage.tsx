import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ErrorPageProps {
  title: string;
  description: string;
}

export const ErrorPage: FunctionComponent<ErrorPageProps> = ({ title, description }) => {
  return (
    <div className="container flex flex-col items-center h-full mt-12 pt-4">
      <div>
        <img className="mx-auto" src="/static/images/errorpage/error.png" alt="error_img" style={{ height: "15vh" }} />
      </div>
      <h2 className="text-orange uppercase pt-5 pb-2 text-3xl md:text-4xl lg:text-5xl font-semibold">{title}</h2>
      <p className="text-black pb-2 text-base md:text-lg lg:text-2xl">{description}</p>
      <Link
        className="mt-4 inline-block px-8 py-4 bg-navy hover:bg-orange text-white hover:text-white border-none rounded-full font-semibold uppercase no-underline transition duration-300 ease-out text-sm"
        to="/"
      >
        Go back to home
      </Link>
    </div>
  );
};
