import { ApolloProvider } from "@apollo/client/react";
import Head from "next/head";

import type { AppProps } from "next/app";
import "styles/globals.css";

import Footer from "components/common/Footer";
import Header from "components/common/Header";
import { client } from "libs/wordpress";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#232C93" />
      </Head>

      <Header />

      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>

      <Footer />
    </>
  );
};

export default MyApp;
