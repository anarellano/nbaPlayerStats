import React from "react";
import { AppProps } from "next/app";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { InMemoryCache, ApolloProvider, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:8000/graphql",
});

//special page if its not set up like this the other pages wont be seen
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
