import React from "react";
import { Redirect, Route } from "react-router-dom";
import { RouteInterface } from "../../routes"
import { useAuthContext } from "../../common/contexts/AuthContext";

export default function ProtectedRoute(routeProps: RouteInterface) {
  const { isLoggedIn } = useAuthContext();
  return isLoggedIn ? <Route {...routeProps} /> : <Redirect to="/" />;
}
