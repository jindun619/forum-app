import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import Layout from "@/components/Layout";

import "../global.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
