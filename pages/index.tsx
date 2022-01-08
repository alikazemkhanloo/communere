import Head from "next/head";
import Form from "../src/components/form";

export default function Index() {
  return (
    <>
      <Head>
        <title>Communere Test</title>
        <meta name="description" content="A test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form />
    </>
  );
}
