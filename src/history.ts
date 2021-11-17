import { createBrowserHistory } from "history";

let history;

if (typeof window !== "undefined") {
  history = createBrowserHistory();
}

export { history };
