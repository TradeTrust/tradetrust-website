import { EmailSuccessPage } from "./pages/emailSuccess";
import { FaqPage } from "./pages/faq";
import { HomePageContainer } from "./pages/home";
import { MediaPage } from "./pages/media";
import { PageNotFound } from "./pages/pageNotFound";
import { ResourcesPage } from "./pages/resources";
import { SettingsAddressBookPage, SettingsAddressResolverPage, SettingsPage } from "./pages/settings";
import { ViewerPage } from "./pages/viewer";
import { ContactPage } from "./pages/contact";

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
  { path: "/contact", exact: true, component: ContactPage },
  { path: "*", component: PageNotFound },
];
