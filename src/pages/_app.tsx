import { ApolloProvider } from "@apollo/client/react";

import type { AppProps } from "next/app";
import "styles/globals.css";

import Footer from "components/common/Footer";
import Header from "components/common/Header";
import { client } from "libs/wordpress";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />

      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>

      <Footer />
    </>
  );
};

export default MyApp;
