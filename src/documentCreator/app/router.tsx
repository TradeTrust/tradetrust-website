import React, { ReactElement, Suspense, lazy, useContext, ComponentType } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { isEmpty } from "lodash";

import { ConfigContext } from "../contexts/ConfigurationContext";

const ConfigDropzoneContainer = lazy((): any => import("../components/ConfigDropzone"));
const FormDisplay = lazy((): any => import("../components/FormDisplay"));
const Web3EnabledWidget = lazy((): any => import("../components/ExampleWeb3Widget"));
const PublishedDocumentView = lazy((): any => import("../components/PublishedDocumentView"));

interface RouteProps {
  component: ComponentType<any>;
  exact: boolean;
  path: string;
}

const ValidatedRoute = ({ component: Component, ...rest }: RouteProps): ReactElement => {
  const { config } = useContext(ConfigContext);
  //update with config authentication to access the route
  const isValidated = !isEmpty(config) && config.formSchema.length > 0;
  return <Route {...rest} render={props => (isValidated ? <Component {...props} /> : <Redirect to="/" />)} />;
};

export const Routes = (): ReactElement => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/document-creator" component={ConfigDropzoneContainer} />
        <ValidatedRoute exact path="/form" component={FormDisplay} />
        <ValidatedRoute exact path="/published" component={PublishedDocumentView} />
        <Route exact path="/web3-example" component={Web3EnabledWidget} />
      </Switch>
    </Suspense>
  </Router>
);
