import { ViewerPage } from "./pages/viewer";
import { HomePageContainer } from "./pages/home";
import { FaqPage } from "./pages/faq";
import { SettingsPage } from "./pages/settings";
import { EmailSuccessPage } from "./pages/emailSuccess";
import { WebinarPage } from "./pages/webinar";
import { TrainingVideosPage } from "./pages/trainingVideos";

export const routes = [
  { path: "/", exact: true, component: HomePageContainer },
  { path: "/viewer", exact: true, component: ViewerPage },
  { path: "/training-videos", exact: true, component: TrainingVideosPage },
  { path: "/faq", exact: true, component: FaqPage },
  { path: "/settings", exact: true, component: SettingsPage },
  { path: "/email/success", exact: true, component: EmailSuccessPage },
  { path: "/webinar", exact: true, component: WebinarPage },
];
