import { AppProps } from "next/app";
import React from "react";
import { wrapper } from "../src/redux/store";
import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
