import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { routes } from "./routes";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { FooterDefault } from "./components/Layout/Footer";
import { Overlay } from "./components/UI/Overlay";
import { OverlayContextProvider } from "./common/contexts/OverlayContext";

const AppContainer = () => {
  return (
    <OverlayContextProvider>
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
    </OverlayContextProvider>
  );
};

export default hot(AppContainer);
