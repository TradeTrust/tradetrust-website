import { OverlayContextProvider } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "./AppContainer";
import { ProviderContextProvider } from "./common/contexts/provider";
import { TokenInformationContextProvider } from "./common/contexts/TokenInformationContext";
import { AuthProvider } from "./common/contexts/AuthenticationContext";
import "./index.css";
import { configureStore } from "./store";
import { Router } from "react-router-dom";
import { history } from "./history";
import { NETWORK_NAME } from "./config";
import { getChainInfoFromNetworkName, getSupportedChainInfo } from "./common/utils/chain-utils";

const store = configureStore();

const App = () => {
  return (
    <OverlayContextProvider>
      <ProviderContextProvider
        defaultChainId={getChainInfoFromNetworkName(NETWORK_NAME).chainId}
        networks={getSupportedChainInfo()}
      >
        <TokenInformationContextProvider>
          <AuthProvider>
            <Provider store={store}>
              <Router history={history}>
                <AppContainer />
              </Router>
            </Provider>
          </AuthProvider>
        </TokenInformationContextProvider>
      </ProviderContextProvider>
    </OverlayContextProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
