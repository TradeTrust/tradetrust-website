import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import AppContainer from "./AppContainer";
import initStore from "./store";
import "styles/libraries.scss";
import "styles/helpers.scss";
import "styles/main.scss";

const history = createBrowserHistory();

const App = () => {
  const store = initStore(history);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
