import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Home from "../src/components/home";

export default function Index() {
  return (
    <>
      <Head>
        <title>Coomunere Test</title>
        <meta name="description" content="A test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </>
  );
}
