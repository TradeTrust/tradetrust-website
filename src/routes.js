import { ViewerPage } from "./pages/viewer";
import { HomePage } from "./pages/home";
import { FaqPage } from "./pages/faq";
import { DocumentCreator } from "./documentCreator/app";

export const routes = [
  { path: "/", exact: true, component: HomePage },
  { path: "/viewer", exact: true, component: ViewerPage },
  { path: "/faq", exact: true, component: FaqPage },
  { path: "/document-creator", exact: true, component: DocumentCreator }
];
