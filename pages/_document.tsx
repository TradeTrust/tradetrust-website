import React from "react";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document<any> {
  static async getInitialProps(ctx: DocumentContext) {
    let initialProps = { html: "" };

    if (typeof document !== "undefined") {
      initialProps = await Document.getInitialProps(ctx);
    }

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="robots" content="index,follow" />
          <meta name="googlebot" content="index,follow" />
          <meta
            name="description"
            content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/static/images/common/share.jpg" />
          <meta property="og:image:alt" content="TradeTrust" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <link rel="icon" type="image/png" href="/static/images/favicon/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/static/images/favicon/favicon-16x16.png" sizes="16x16" />
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
