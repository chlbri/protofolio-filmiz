import type { AppProps } from 'next/app';
import useMachineRouter from '../hooks/useMachineRouter';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useMachineRouter();
  return <Component {...pageProps} />;
}
export default MyApp;
