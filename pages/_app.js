import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { NotificationProvider } from "web3uikit";
import { MoralisProvider } from "react-moralis";
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

      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <Navbar />
          <Component {...pageProps} />
        </NotificationProvider>
      </MoralisProvider>
    </>
  );
}

export default App;
