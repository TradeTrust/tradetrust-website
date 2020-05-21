import { ViewerPage } from "./pages/viewer";
import { HomePageContainer } from "./pages/home";
import { FaqPage } from "./pages/faq";
import { SettingsPage } from "./pages/settings";
import { EmailSuccessPage } from "./pages/emailSuccess";

export const routes = [
  { path: "/", exact: true, component: HomePageContainer },
  { path: "/viewer", exact: true, component: ViewerPage },
  { path: "/faq", exact: true, component: FaqPage },
  { path: "/settings", exact: true, component: SettingsPage },
  { path: "/email/success", exact: true, component: EmailSuccessPage },
];
