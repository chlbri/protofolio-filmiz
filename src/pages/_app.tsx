import type { AppProps } from "next/app";
import Head from "next/head";
import ProviderMachine from "../components/providers";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProviderMachine>
      <Head>
        <title>Filmiz 2.0</title>
      </Head>
      <Component {...pageProps} />
    </ProviderMachine>
  );
}
export default MyApp;
