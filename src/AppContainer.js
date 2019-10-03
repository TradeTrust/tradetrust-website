import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { routes } from "./routes";

const AppContainer = () => (
  <Switch>
    {routes.map((route, id) => (
      <Route key={id} {...route} />
    ))}
  </Switch>
);

export default hot(AppContainer);
