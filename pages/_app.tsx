import React from "react";

import "../styles/globals.css";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { configureStore } from "../src/store";
import AppContainerNext from "../src/AppContainerNext";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import dynamic from "next/dynamic";
import { SEO_DEFAULT } from "../src/common/utils/seo";
import { OverlayContextProvider } from "@govtechsg/tradetrust-ui-components";
import { ProviderContextProvider } from "../src/common/contexts/provider";
import { AuthProvider } from "../src/common/contexts/AuthenticationContext";
const TokenInformationContextProvider = dynamic<any>(
  () => import("../src/common/contexts/TokenInformationContext").then((mod) => mod.TokenInformationContextProvider),
  { ssr: false }
);

const store = configureStore();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO_DEFAULT} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <OverlayContextProvider>
        <ProviderContextProvider>
          <TokenInformationContextProvider>
            <AuthProvider>
              <Provider store={store}>
                <AppContainerNext>
                  <Component {...pageProps} />
                </AppContainerNext>
              </Provider>
            </AuthProvider>
          </TokenInformationContextProvider>
        </ProviderContextProvider>
      </OverlayContextProvider>
    </>
  );
}
