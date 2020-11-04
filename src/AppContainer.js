import { NetworkBar, Overlay } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch, useLocation } from "react-router-dom";
import { FooterDefault } from "./components/Layout/Footer";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { routes } from "./routes";

const AppContainer = () => {
  const location = useLocation();

  return (
    <div className="wrapper" data-location={location.pathname}>
      <NetworkBar />
      <NavigationBar />
      <main>
        <Switch>
          {routes.map((route, id) => (
            <Route key={id} {...route} />
          ))}
        </Switch>
      </main>
      <FooterDefault />
      <Overlay />
    </div>
  );
};

export default hot(AppContainer);
