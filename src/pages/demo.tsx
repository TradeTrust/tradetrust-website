import React, { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../common/contexts/AuthenticationContext";
import { useProviderContext } from "../common/contexts/provider";
import { DemoInitial } from "../components/Demo/DemoInitial";
import { Page } from "../components/Layout/Page";

export const DemoLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full bg-white rounded-xl shadow-xl p-6 lg:w-2/3">{children}</div>
      <div className="mx-auto my-8 w-1/2 lg:w-1/3">
        <img src="/static/images/faq/faq-person.png" alt="FAQ person" />
      </div>
    </div>
  );
};

export const Demo: FunctionComponent = () => {
  const { login, isLoggedIn } = useAuthContext();
  const { upgradeToMagicSigner } = useProviderContext();
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/demo/create");
    }
  }, [isLoggedIn, history]);

  return <DemoInitial login={login} upgradeToMagicSigner={() => upgradeToMagicSigner} />;
};

export const DemoPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        property="description"
        content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
      />
      <meta
        property="og:description"
        content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
      />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/demo`} />
      <title>TradeTrust - Demo</title>
    </Helmet>
    <Page title="Demo">
      <DemoLayout>
        <Demo />
      </DemoLayout>
    </Page>
  </>
);
