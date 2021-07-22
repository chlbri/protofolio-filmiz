/** @format */

import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <>
        <Head>
          <title>Filmiz 2.0</title>
        </Head>
        <Component {...pageProps} />
      </>
    </RecoilRoot>
  );
}
export default MyApp;
