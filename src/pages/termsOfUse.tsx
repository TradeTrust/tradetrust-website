import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import termsOfUse from "../../TERMS_OF_USE.md";
import { Page } from "../components/Layout/Page";

export const TermsOfUsePage: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <meta name="terms of use" content="Terms Of Use" />
        <meta property="og:terms of use" content="Terms Of Use" />
        <meta property="og:title" content="TradeTrust - Terms Of Use" />
        <meta property="og:url" content={`${window.location.origin}/terms-of-use`} />
        <title>TradeTrust - Terms Of Use</title>
      </Helmet>
      <Page title="Terms Of Use">
        <div className="bg-white drop-shadow-lg rounded-xl h-full w-full px-6 py-4 mt-4">
          <ReactMarkdown
            className="legal"
            components={{
              p: ({ ...props }) => <p className={"mb-4 break-word"} {...props} />,
              a: ({ ...props }) => <a target={"_blank"} rel={"noopener noreferrer"} {...props} />,
            }}
          >
            {termsOfUse.body}
          </ReactMarkdown>
        </div>
      </Page>
    </>
  );
};
