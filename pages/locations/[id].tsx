import Head from "next/head";
import { useRouter } from "next/router";
import Form from "../../src/components/form";

export default function Index() {
  const router = useRouter();
  const { query } = router;
  const id = query.id as string;
  const index = parseInt(id) ?? undefined;

  return (
    <>
      <Head>
        <title>Communere Test</title>
        <meta name="description" content="A test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form index={index} />
    </>
  );
}
