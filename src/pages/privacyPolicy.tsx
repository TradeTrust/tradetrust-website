import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import privacyPolicy from "../../PRIVACY_POLICY.md";
import { Page } from "../components/Layout/Page";

export const PrivacyPolicyPage: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <meta name="privacy policy" content="Privacy Policy" />
        <meta property="og:privacy policy" content="Privacy Policy" />
        <meta property="og:title" content="TradeTrust - Privacy Policy" />
        <meta property="og:url" content={`${window.location.origin}/privacy-policy`} />
        <title>TradeTrust - Privacy Policy</title>
      </Helmet>
      <Page title="Privacy Policy">
        <div className="bg-white drop-shadow-lg rounded-xl h-full w-full px-6 py-4 mt-4">
          <ReactMarkdown components={{ p: ({ ...props }) => <p className={"mb-4 break-word"} {...props} /> }}>
            {privacyPolicy.body}
          </ReactMarkdown>
        </div>
      </Page>
    </>
  );
};
