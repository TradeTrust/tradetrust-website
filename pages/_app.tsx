import React from "react";

import "../styles/globals.css";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { configureStore } from "../src/store";
import AppContainerNext from "../src/AppContainerNext";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { SEO_DEFAULT } from "../src/common/utils/seo";

const store = configureStore();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO_DEFAULT} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <AppContainerNext>
          <Component {...pageProps} />
        </AppContainerNext>
      </Provider>
    </>
  );
}
