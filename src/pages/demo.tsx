import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { DemoInitial } from "../components/Demo/DemoInitial";
import { Page } from "../components/Layout/Page";
import { resetDemoCreateState } from "../reducers/demo-create";
import { resetDemoState as resetDemoVerifyState } from "../reducers/demo-verify";
import { useDispatch } from "react-redux";

export const DemoLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full lg:w-3/4">
        <div className="bg-white rounded-xl shadow-xl p-6">{children}</div>
      </div>
      <div className="w-56 mx-auto my-8">
        <div className="px-4">
          <img className="max-h-96 hidden lg:block" src="/static/images/faq/faq-man.png" alt="FAQ person" />
        </div>
      </div>
    </div>
  );
};

export const Demo: FunctionComponent = () => {
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    dispatch(resetDemoCreateState());
    dispatch(resetDemoVerifyState());
  }, [dispatch]);

  return <DemoInitial />;
};

export const DemoPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        property="description"
        content="Take the demo user journey and have a hands-on experience with how easy it is to create a digital document via blockchain and streamline your operations using TradeTrust."
      />
      <meta
        property="og:description"
        content="Take the demo user journey and have a hands-on experience with how easy it is to create a digital document via blockchain and streamline your operations using TradeTrust."
      />
      <meta property="og:title" content="TradeTrust - Certificate of Origin Demo" />
      <meta property="og:url" content={`${window.location.origin}/demo`} />
      <title>TradeTrust - Certificate of Origin Demo</title>
      <meta
        name="keywords"
        content="Blockchain, NFT, Ethereum, Electronic Trade Document, Digital Trade Document, Demo, Verifiable Document, Transferable Documents, Certificate of Origin"
      />
    </Helmet>
    <Page title="Demo">
      <DemoLayout>
        <Demo />
      </DemoLayout>
    </Page>
  </>
);
