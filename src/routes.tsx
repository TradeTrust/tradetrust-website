import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { DemoPage } from "./pages/demo";
import { DemoCreatePage } from "./pages/demoCreate";
import { DemoVerifyPage } from "./pages/demoVerify";
import { EtaPage } from "./pages/eta";
import { EventPage } from "./pages/event";
import { EventPageDetail } from "./pages/event/eventDetail";
import { FaqPage } from "./pages/faq";
import { FaqPageDetail } from "./pages/faqDetail";
import { Guidelines } from "./pages/guidelines";
import { HomePage } from "./pages/home";
import { LearnPage } from "./pages/learn";
import { NewsPage } from "./pages/news";
import { NewsPageDetail } from "./pages/newsDetail";
import { PageNotFound } from "./pages/pageNotFound";
import { PrivacyPolicyPage } from "./pages/privacyPolicy";
import { SettingsAddressBookPage, SettingsAddressResolverPage, SettingsPage } from "./pages/settings";
import { TermsOfUsePage } from "./pages/termsOfUse";
import VerifyPage from "./pages/verify";
import { ViewerPage } from "./pages/viewer";
import { CostPage } from "./pages/cost";
import { PartnersPage } from "./pages/partners";
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
  home: { exact: true, component: HomePage },
  verify: { exact: true, component: VerifyPage },
  viewer: { exact: true, render: renderViewer },
  faq: { exact: true, component: FaqPage },
  generalFaq: { exact: true, component: FaqPageDetail },
  productFaq: { exact: true, component: FaqPageDetail },
  eta: { exact: true, component: EtaPage },
  settings: { exact: true, component: SettingsPage },
  addressResolver: { exact: true, component: SettingsAddressResolverPage },
  addressBook: { exact: true, component: SettingsAddressBookPage },
  news: { exact: true, component: NewsPage },
  newsDetail: { exact: true, component: NewsPageDetail },
  learn: { exact: true, component: LearnPage },
  event: { exact: true, component: EventPage },
  eventDetail: { exact: true, component: EventPageDetail },
  guidelines: { exact: true, component: Guidelines },
  privacyPolicy: { exact: true, component: PrivacyPolicyPage },
  termsOfUse: { exact: true, component: TermsOfUsePage },
  cost: { exact: true, component: CostPage },
  partners: { exact: true, component: PartnersPage },
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
