import { NetworkBar, Overlay } from "@govtechsg/tradetrust-ui-components";
import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch, useLocation } from "react-router-dom";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { NETWORK } from "./config";
import { routes } from "./routes";
import styled from "@emotion/styled";

const Main = styled.main`
  background-image: url("/static/images/common/wave-lines.png");
  background-size: cover;
`;

const AppContainer = () => {
  const location = useLocation();
  const [toggleNavBar, setToggleNavBar] = useState(false);

  useEffect(() => {
    setToggleNavBar(false);
  }, [location]);

  return (
    <div className="flex flex-col min-h-full" data-location={location.pathname}>
      <NetworkBar network={NETWORK}>
        You are currently on <span className="capitalize">{NETWORK}</span> network.
      </NetworkBar>
      {/* for CR: see if any chance to pass and cater for logo/home too, that will need router navLink too */}
      <NavigationBar toggleNavBar={toggleNavBar} setToggleNavBar={setToggleNavBar} />
      <Main className="bg-cerulean-50 flex-1">
        <Switch>
          {routes.map((route, id) => (
            <Route key={id} {...route} />
          ))}
        </Switch>
      </Main>
      <Footer />
      <Overlay />
    </div>
  );
};

export default hot(AppContainer);
