import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import AppContainer from "./AppContainer";
import { AuthProvider } from "./common/contexts/AuthenticationContext";
import { OverlayContextProvider } from "./common/contexts/OverlayContext";
import { ProviderContextProvider } from "./common/contexts/provider";
import { TokenInformationContextProvider } from "./common/contexts/TokenInformationContext";
import { gaPageView } from "./common/utils/analytics";
import { getChainInfoFromNetworkName, getSupportedChainInfo } from "./common/utils/chain-utils";
import { GA_MEASUREMENT_ID, NETWORK_NAME } from "./config";
import { history } from "./history";
import "./index.css";
import { configureStore } from "./store";

const store = configureStore();

history.listen(() => {
  gaPageView({ action: "page_view" }, GA_MEASUREMENT_ID);
});

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
