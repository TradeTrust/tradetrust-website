import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import AppContainer from "./AppContainer";
import initStore from "./store";
import "styles/main.scss";
import { ProviderContextProvider } from "./common/contexts/provider";

const history = createBrowserHistory();

const App = () => {
  const store = initStore(history);
  return (
    <ProviderContextProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppContainer />
        </ConnectedRouter>
      </Provider>
    </ProviderContextProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
