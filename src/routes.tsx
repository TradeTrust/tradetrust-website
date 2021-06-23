import { EmailSuccessPage } from "./pages/emailSuccess";
import { EmailErrorPage } from "./pages/emailError";
import { FaqPage } from "./pages/faq";
import { HomePageContainer } from "./pages/home";
import VerifyPage from "./pages/verify";
import { PageNotFound } from "./pages/pageNotFound";
import { NewsPage } from "./pages/news";
import { NewsPageDetail } from "./pages/newsDetail";
import { ResourcesPage } from "./pages/resources";
import { SettingsAddressBookPage, SettingsAddressResolverPage, SettingsPage } from "./pages/settings";
import { ViewerPage } from "./pages/viewer";
import { ContactPage } from "./pages/contact";
import { EventPage } from "./pages/event/event";

export const routes = [
  { path: "/", exact: true, component: HomePageContainer },
  { path: "/verify", exact: true, component: VerifyPage },
  { path: "/viewer", exact: true, component: ViewerPage },
  { path: "/faq", exact: true, component: FaqPage },
  { path: "/settings", exact: true, component: SettingsPage },
  { path: "/settings/address-resolver", exact: true, component: SettingsAddressResolverPage },
  { path: "/settings/address-book", exact: true, component: SettingsAddressBookPage },
  { path: "/email/success", exact: true, component: EmailSuccessPage },
  { path: "/email/error", exact: true, component: EmailErrorPage },
  { path: "/news", exact: true, component: NewsPage },
  { path: "/news/:slug", exact: true, component: NewsPageDetail },
  { path: "/resources", exact: true, component: ResourcesPage },
  { path: "/event", exact: true, component: EventPage },
  { path: "/contact", exact: true, component: ContactPage },
  { path: "*", component: PageNotFound },
];
