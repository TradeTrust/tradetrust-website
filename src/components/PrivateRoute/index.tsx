import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { useMagicContext } from "../../common/contexts/MagicContext";
import { RouteInterface } from "../../routes";

export const PrivateRoute: FunctionComponent<RouteInterface> = (routeProps: RouteInterface) => {
  const { isLoggedIn } = useMagicContext();

  return isLoggedIn ? <Route {...routeProps} /> : <Redirect to="/" />;
};
