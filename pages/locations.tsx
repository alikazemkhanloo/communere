import dynamic from "next/dynamic";
import Head from "next/head";
const Locations = dynamic(() => import("../src/components/locations"), {
  ssr: false,
});
export default function Index() {
  return (
    <>
      <Head>
        <title>All Locations</title>
        <meta name="description" content="All locations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Locations />
    </>
  );
}
