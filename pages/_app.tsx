import React from "react";

import "../styles/globals.css";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { configureStore } from "../src/store";
import Head from "next/head";

const store = configureStore();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TradeTrust - An easy way to check and verify your documents</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
