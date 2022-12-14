import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class AppDocument extends Document {
  public render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          <link
            rel="icon"
            type="image/png"
            href="/static/img/company-logo.jpg"
          />
          <link
            href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/@coreui/icons@1.0.0/css/all.min.css"
          />
        </Head>
        <body className="c-app">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
