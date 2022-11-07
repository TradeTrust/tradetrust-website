import React, { FunctionComponent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { importAll } from "../common/utils/importAll";
import { Page } from "../components/Layout/Page";

type PrivacyPolicy = {
  body: string;
  attributes: {
    title: string;
  };
};

export const PrivacyPolicyPage: FunctionComponent = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState<PrivacyPolicy[]>([]);

  useEffect(() => {
    const policy = importAll(require.context("../../cms/privacy-policy", false, /\.md$/)) as PrivacyPolicy[];
    setPrivacyPolicy(policy);
  }, []);

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
        {privacyPolicy.map((policy, index) => (
          <div key={`policy-${index}`} className="bg-white drop-shadow-lg rounded-xl h-full w-full px-6 py-4 mt-4">
            <ReactMarkdown components={{ p: ({ ...props }) => <p className={"mb-4 break-word"} {...props} /> }}>
              {policy.body}
            </ReactMarkdown>
          </div>
        ))}
      </Page>
    </>
  );
};
