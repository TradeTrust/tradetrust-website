import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import AppContainer from "./AppContainer";
import initStore from "./store";
import { GA_ID } from "./config";

const history = createBrowserHistory();

const App = () => {
  const store = initStore(history);
  window.ga("create", GA_ID, "auto");
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
