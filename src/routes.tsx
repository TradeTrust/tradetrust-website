import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { EmailSuccessPage } from "./pages/emailSuccess";
import { FaqPage } from "./pages/faq";
import { HomePageContainer } from "./pages/home";
import { MediaPage } from "./pages/media";
import { PageNotFound } from "./pages/pageNotFound";
import { ResourcesPage } from "./pages/resources";
import { SettingsAddressBookPage, SettingsAddressResolverPage, SettingsPage } from "./pages/settings";
import { ViewerPage } from "./pages/viewer";
import { DemoPage } from "./pages/demo";

export const routes = [
  { path: "/", exact: true, component: HomePageContainer },
  { path: "/viewer", exact: true, component: ViewerPage },
  { path: "/faq", exact: true, component: FaqPage },
  { path: "/settings", exact: true, component: SettingsPage },
  { path: "/settings/address-resolver", exact: true, component: SettingsAddressResolverPage },
  { path: "/settings/address-book", exact: true, component: SettingsAddressBookPage },
  { path: "/email/success", exact: true, component: EmailSuccessPage },
  { path: "/resources", exact: true, component: ResourcesPage },
  { path: "/media", exact: true, component: MediaPage },
  { path: "/demo", exact: true, component: DemoPage, protectedRoute: true },
  { path: "*", component: PageNotFound },
];

export interface RouteInterface {
  path: string;
  exact: boolean;
  component: React.FunctionComponent;
  protectedRoute?: boolean;
}
interface RouteProps {
  routes: RouteInterface[];
}

const routeMapper = (route: RouteInterface, id: number) => {
  const { protectedRoute } = route;
  return protectedRoute ? <ProtectedRoute key={id} {...route} /> : <Route key={id} {...route} />;
};

export const Routes = ({ routes }: RouteProps) => {
  return <Switch>{routes.map(routeMapper)}</Switch>;
};
