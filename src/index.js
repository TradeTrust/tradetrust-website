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
import { TokenInformationContextProvider } from "./common/contexts/TokenInformationContext";

const history = createBrowserHistory();

const App = () => {
  const store = initStore(history);
  return (
    <OverlayContextProvider>
      <ProviderContextProvider>
        <Provider store={store}>
          <TokenInformationContextProvider>
            <ConnectedRouter history={history}>
              <AppContainer />
            </ConnectedRouter>
          </TokenInformationContextProvider>
        </Provider>
      </ProviderContextProvider>
    </OverlayContextProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
