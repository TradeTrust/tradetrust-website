import React from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch, useLocation } from "react-router-dom";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { NetworkBar } from "./components/UI/NetworkBar";
import { Overlay } from "./components/UI/Overlay";
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
      <Footer />
      <Overlay />
    </div>
  );
};

export default hot(AppContainer);
