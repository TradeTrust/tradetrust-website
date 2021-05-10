import { OverlayContextProvider } from "@govtechsg/tradetrust-ui-components";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "./AppContainer";
import { ProviderContextProvider } from "./common/contexts/provider";
import { TokenInformationContextProvider } from "./common/contexts/TokenInformationContext";
import "./index.css";
import { configureStore, history } from "./store";

const store = configureStore();

const App = () => {
  return (
    <OverlayContextProvider>
      <ProviderContextProvider>
        <TokenInformationContextProvider>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <AppContainer />
            </ConnectedRouter>
          </Provider>
        </TokenInformationContextProvider>
      </ProviderContextProvider>
    </OverlayContextProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
