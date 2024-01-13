import React from "react";
import { AppProps } from "next/app";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

//special page if its not set up like this the other pages wont be seen
const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
