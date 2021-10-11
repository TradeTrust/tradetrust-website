import { NetworkBar, Overlay } from "@govtechsg/tradetrust-ui-components";
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar, leftNavItems, rightNavItems } from "./components/Layout/NavigationBar";
import { PrivateRoute } from "./components/PrivateRoute";
import { NETWORK } from "./config";
import { routes } from "./routes";
import styled from "@emotion/styled";
import { PageNotFound } from "./pages/pageNotFound";
import { DemoCreatePage } from "./pages/demoCreate";
import { DemoVerifyPage } from "./pages/demoVerify";
import { DemoViewerPage } from "./pages/demoViewer";
import { DemoPage } from "./pages/demo";
import { FeatureFlag } from "./components/FeatureFlag";

const Main = styled.main`
  background-image: url("/static/images/common/wave-lines.png");
  background-size: cover;
`;

const AppContainer = (): React.ReactElement => {
  const location = useLocation();
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const isDemoDocumentVerified = useSelector((state: RootState) => state.demoVerify.verificationStatus);

  useEffect(() => {
    setToggleNavBar(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-full" data-location={location.pathname}>
      <NetworkBar network={NETWORK}>
        You are currently on <span className="capitalize">{NETWORK}</span> network.
      </NetworkBar>
      <NavigationBar
        toggleNavBar={toggleNavBar}
        setToggleNavBar={setToggleNavBar}
        leftItems={leftNavItems}
        rightItems={rightNavItems}
      />
      <Main className="bg-cerulean-50 flex-1">
        <Switch>
          {routes.map((route, id) => (
            <Route key={id} {...route} />
          ))}
          {NETWORK === "ropsten" && (
            <FeatureFlag name="MAGIC_DEMO">
              <Route path="/demo/viewer" exact>
                {isDemoDocumentVerified ? <DemoViewerPage /> : <Redirect to="/demo/verify" />}
              </Route>
              <Route path="/demo/verify" exact>
                <DemoVerifyPage />
              </Route>
              <PrivateRoute path="/demo/create" redirectPath="/demo" exact>
                <DemoCreatePage />
              </PrivateRoute>
              <Route path="/demo" exact>
                <DemoPage />
              </Route>
            </FeatureFlag>
          )}
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Main>
      <Footer />
      <Overlay />
    </div>
  );
};

export default AppContainer;
