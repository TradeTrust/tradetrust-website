import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { DemoPage } from "./pages/demo";
import { DemoCreatePage } from "./pages/demoCreate";
import { DemoVerifyPage } from "./pages/demoVerify";
import { PageNotFound } from "./pages/pageNotFound";
import { PrivacyPolicyPage } from "./pages/privacyPolicy";
import { SettingsAddressBookPage, SettingsAddressResolverPage, SettingsPage } from "./pages/settings";
import { TermsOfUsePage } from "./pages/termsOfUse";
import VerifyPage from "./pages/verify";
import { ViewerPage } from "./pages/viewer";
import { paths } from "./config/routes-config";

export const FORM_SG_URL = "https://www.form.gov.sg/635f32c5001b2d0011fff09b";

const renderViewer = (): React.ReactElement => <ViewerPage />;
const renderMagicViewer = (): React.ReactElement => <ViewerPage isMagicDemo />;
// HOT FIX (Temp removal of magic demo until we might decide to kill it)
// eslint-disable-next-line
const demoRoutes = [
  { path: "/demo", exact: true, component: DemoPage },
  {
    path: "/demo/create",
    exact: true,
    component: DemoCreatePage,
    privateRoute: true,
  },
  { path: "/demo/verify", exact: true, component: DemoVerifyPage, privateRoute: true },
  {
    path: "/demo/viewer",
    exact: true,
    render: renderMagicViewer,
    privateRoute: true,
  },
];

type RouteComponents = Record<string, Omit<RouteInterface, "path">>;

const routeComponents: RouteComponents = {
  verify: { exact: true, component: VerifyPage },
  viewer: { exact: true, render: renderViewer },
  settings: { exact: true, component: SettingsPage },
  addressResolver: { exact: true, component: SettingsAddressResolverPage },
  addressBook: { exact: true, component: SettingsAddressBookPage },
  privacyPolicy: { exact: true, component: PrivacyPolicyPage },
  termsOfUse: { exact: true, component: TermsOfUsePage },
  notFound: { component: PageNotFound },
};

const pathKeys = Object.keys(paths);
const componentKeys = Object.keys(routeComponents);

if (pathKeys.length !== componentKeys.length || !pathKeys.every((key) => componentKeys.includes(key))) {
  throw new Error("Path and component keys do not match. Check your route configuration.");
}

export const routes: RouteInterface[] = pathKeys.map((key) => ({
  path: paths[key],
  ...routeComponents[key],
}));

export interface RouteInterface {
  path: string;
  exact?: boolean;
  component?: React.FunctionComponent;
  render?: () => JSX.Element;
  privateRoute?: boolean;
}
interface RouteProps {
  routes: RouteInterface[];
}

const routeMapper = (route: RouteInterface, id: number): React.ReactElement => {
  const { privateRoute } = route;
  return privateRoute ? <PrivateRoute key={id} {...route} /> : <Route key={id} {...route} />;
};

export const Routes = ({ routes: routeItems }: RouteProps): React.ReactElement => {
  return <Switch>{routeItems.map(routeMapper)}</Switch>;
};

export const FormSgContactLink: React.FunctionComponent<React.HTMLProps<HTMLAnchorElement>> = (props) => {
  return (
    <a href={FORM_SG_URL} target="_blank" rel="noopener noreferrer" {...props}>
      {props.children}
    </a>
  );
};
