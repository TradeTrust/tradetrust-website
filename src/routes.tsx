import { EmailSuccessPage } from "./pages/emailSuccess";
import { FaqPage } from "./pages/faq";
import { HomePageContainer } from "./pages/home";
import { ResourcesPage } from "./pages/resources";
import { SettingsPage } from "./pages/settings";
import { TrainingVideosPage } from "./pages/trainingVideos";
import { ViewerPage } from "./pages/viewer";
import { WebinarPage } from "./pages/webinar";
import { MediaPage } from "./pages/media";

export const routes = [
  { path: "/", exact: true, component: HomePageContainer },
  { path: "/viewer", exact: true, component: ViewerPage },
  { path: "/training-videos", exact: true, component: TrainingVideosPage },
  { path: "/faq", exact: true, component: FaqPage },
  { path: "/settings", exact: true, component: SettingsPage },
  { path: "/email/success", exact: true, component: EmailSuccessPage },
  { path: "/webinar", exact: true, component: WebinarPage },
  { path: "/resources", exact: true, component: ResourcesPage },
  { path: "/media", exact: true, component: MediaPage },
];
