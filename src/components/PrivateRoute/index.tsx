import React, { FunctionComponent } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useAuthContext } from "../../common/contexts/AuthenticationContext";

interface PrivateRouteProps extends RouteProps {
  redirectPath: string;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ redirectPath, children, ...rest }) => {
  const { isLoggedIn } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
