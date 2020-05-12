import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import AppContainer from "./AppContainer";
import initStore from "./store";
import "styles/main.scss";
import { OverlayContextProvider } from "./common/contexts/OverlayContext";
import { ProviderContextProvider } from "./common/contexts/provider";

const history = createBrowserHistory();

const App = () => {
  const store = initStore(history);
  return (
    <OverlayContextProvider>
      <ProviderContextProvider>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <AppContainer />
          </ConnectedRouter>
        </Provider>
      </ProviderContextProvider>
    </OverlayContextProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
