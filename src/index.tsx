import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import AppContainer from "./AppContainer";
import { AuthProvider } from "./common/contexts/AuthenticationContext";
import { CreatorContextProvider } from "./common/contexts/CreatorContext/CreatorContext";
import { OverlayContextProvider } from "./common/contexts/OverlayContext";
import { ProviderContextProvider } from "./common/contexts/provider";
import { TokenInformationContextProvider } from "./common/contexts/TokenInformationContext";
import { gaPageView } from "./common/utils/analytics";
import { getChainInfoFromNetworkName, getSupportedChainInfo } from "./common/utils/chain-utils";
import { GA_MEASUREMENT_ID, NETWORK_NAME } from "./config";
import { history } from "./history";
import "./index.css";
import { configureStore } from "./store";
import { FormsContextProvider } from "./common/contexts/FormsContext";
import { ConfigContextProvider } from "./common/contexts/ConfigContext";

const store = configureStore();

history.listen(() => {
  gaPageView({ action: "page_view" }, GA_MEASUREMENT_ID);
});

const App = () => {
  return (
    <ConfigContextProvider>
      <FormsContextProvider>
        <OverlayContextProvider>
          <ProviderContextProvider
            defaultChainId={getChainInfoFromNetworkName(NETWORK_NAME).chainId}
            networks={getSupportedChainInfo()}
          >
            <TokenInformationContextProvider>
              <CreatorContextProvider>
                <AuthProvider>
                  <Provider store={store}>
                    <Router history={history}>
                      <AppContainer />
                    </Router>
                  </Provider>
                </AuthProvider>
              </CreatorContextProvider>
            </TokenInformationContextProvider>
          </ProviderContextProvider>
        </OverlayContextProvider>
      </FormsContextProvider>
    </ConfigContextProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
