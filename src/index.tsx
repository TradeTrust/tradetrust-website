import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { OverlayContextProvider } from "@govtechsg/tradetrust-ui-components";
import { gaPageView } from "@govtechsg/tradetrust-utils";
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
import { GA_MEASUREMENT_ID } from "./config";

const store = configureStore();

history.listen(() => {
  gaPageView({ action: "page_view" }, GA_MEASUREMENT_ID);
});

Sentry.init({
  dsn: "https://641696c17e944497896db0490392800a@o1286537.ingest.sentry.io/6500498",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0, // process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  enabled: false,
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
