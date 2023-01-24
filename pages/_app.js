import "@/styles/globals.css";
import Head from "next/head";
// import styles from "@/styles/Home.module.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Summ.money</title>
        <meta name="description" content="Summ.money" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
