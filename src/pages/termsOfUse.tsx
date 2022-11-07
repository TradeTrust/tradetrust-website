import React, { FunctionComponent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { importAll } from "../common/utils/importAll";
import { Page } from "../components/Layout/Page";

type TermsOfUse = {
  body: string;
  attributes: {
    title: string;
  };
};

export const TermsOfUsePage: FunctionComponent = () => {
  const [termsOfUse, setTermsOfUse] = useState<TermsOfUse[]>([]);

  useEffect(() => {
    const terms = importAll(require.context("../../cms/terms-of-use", false, /\.md$/)) as TermsOfUse[];
    setTermsOfUse(terms);
  }, []);

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
        {termsOfUse.map((terms, index) => (
          <div
            key={`terms-of-use-${index}`}
            className="bg-white drop-shadow-lg rounded-xl h-full w-full px-6 py-4 mt-4"
          >
            <ReactMarkdown components={{ p: ({ ...props }) => <p className={"mb-4 break-word"} {...props} /> }}>
              {terms.body}
            </ReactMarkdown>
          </div>
        ))}
      </Page>
    </>
  );
};
