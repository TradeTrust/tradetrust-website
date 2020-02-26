import { ViewerPage } from "./pages/viewer";
import { HomePageContainer } from "./pages/home";
import { FaqPage } from "./pages/faq";

export const routes = [
  { path: "/", exact: true, component: HomePageContainer },
  { path: "/viewer", exact: true, component: ViewerPage },
  { path: "/faq", exact: true, component: FaqPage }
];
