import React from "react";
import * as _ from "styled-jsx"; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
export default MyApp;
