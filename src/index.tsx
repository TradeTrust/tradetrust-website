import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import AppContainer from "./AppContainer";
import { ConfigContextProvider } from "./common/contexts/ConfigContext";
import { CreatorContextProvider } from "./common/contexts/CreatorContext/CreatorContext";
import { FormsContextProvider } from "./common/contexts/FormsContext";
import { MagicProvider } from "./common/contexts/MagicContext";
import { OverlayContextProvider } from "./common/contexts/OverlayContext";
import { ProviderContextProvider } from "./common/contexts/provider";
import { TokenInformationContextProvider } from "./common/contexts/TokenInformationContext";
import { gaPageView } from "./common/utils/analytics";
import { getChainInfoFromNetworkName, getSupportedChainInfo } from "./common/utils/chain-utils";
import { GA_MEASUREMENT_ID, NETWORK_NAME } from "./config";
import { history } from "./history";
import "./index.css";
import { configureStore } from "./store";
import * as Sentry from "@sentry/react";

const store = configureStore();

history.listen(() => {
  gaPageView({ action: "page_view" }, GA_MEASUREMENT_ID);
});

Sentry.init({
  dsn: process.env.SENTRY_DATA_SOURCE_NAME,
  environment: process.env.NODE_ENV,
  sendDefaultPii: true,
  integrations: (integrations) => {
    return [
      ...integrations,
      Sentry.captureConsoleIntegration({ levels: ["error"] }),
      Sentry.browserTracingIntegration(),
    ];
  },
  tracesSampleRate: 1.0,
});

const App = () => {
  const defaultChainId = getChainInfoFromNetworkName(NETWORK_NAME).chainId;

  return (
    <ConfigContextProvider>
      <FormsContextProvider>
        <OverlayContextProvider>
          <MagicProvider defaultChainId={defaultChainId}>
            <ProviderContextProvider defaultChainId={defaultChainId} networks={getSupportedChainInfo()}>
              <Provider store={store}>
                <TokenInformationContextProvider>
                  <CreatorContextProvider>
                    <Router history={history}>
                      <AppContainer />
                    </Router>
                  </CreatorContextProvider>
                </TokenInformationContextProvider>
              </Provider>
            </ProviderContextProvider>
          </MagicProvider>
        </OverlayContextProvider>
      </FormsContextProvider>
    </ConfigContextProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
