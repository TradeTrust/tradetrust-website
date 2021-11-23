import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document<any> {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;family=Ubuntu:wght@400;700&amp;display=swap"
            rel="stylesheet"
          />

          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
          <script src="https://kit.fontawesome.com/491fca5fd9.js" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
