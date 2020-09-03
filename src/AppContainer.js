import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { routes } from "./routes";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { FooterDefault } from "./components/Layout/Footer";
import { Overlay } from "./components/UI/Overlay";
import { NetworkBar } from "./components/UI/NetworkBar";

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
