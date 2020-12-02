import { OverlayContextProvider } from "@govtechsg/tradetrust-ui-components";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "./AppContainer";
import { ProviderContextProvider } from "./common/contexts/provider";
import { TokenInformationContextProvider } from "./common/contexts/TokenInformationContext";
import "./index.css";
import initStore from "./store";
import "./styles.css";

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
