import React, { useState, useEffect } from "react";
import SummCard from "../../../components/SummCard";
import initializeAndExportFactory from "../../../constants/factory.js";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function summs({ address }) {
  const [lastDeployedSumm, setLastDeployedSumm] = useState("");
  const [shorterSummAddress, setShorterSummAddress] = useState("");
  let factory;

  useEffect(() => {
    getFactory();
  }, []);

  //   async function useFactory() {
  //     const factory = await initializeAndExportFactory();
  //     // Use the fully initialized factory
  // }

  async function getFactory() {
    factory = await initializeAndExportFactory();
    const arrayOfDeployedSumms = await factory.getDeployedSumms.call();
    setLastDeployedSumm(arrayOfDeployedSumms[arrayOfDeployedSumms.length - 1]);
    setShorterSummAddress(lastDeployedSumm.slice(0, 6) + "..." + lastDeployedSumm.slice(-6));
  }

  // async function getValue() {
  //     console.log();
  //     // const arrayOfDeployedSumms = await factory.getDeployedSumms.call();
  //     // setLastDeployedSumm(arrayOfDeployedSumms[arrayOfDeployedSumms.length - 1]);
  //     // setShorterSummAddress(lastDeployedSumm.slice(0, 6) + "..." + lastDeployedSumm.slice(-6));

  // }

  return (
    <>
      {/* <div className="flex flex-row justify-center " >
        Status:
      </div> */}
      <div id="TestMySumms" className="flexParentSumms">
        <div className="flexChild">
          {lastDeployedSumm ? (
            <SummCard address={address} lastDeployedSumm={lastDeployedSumm} />
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          {/* <SummCard address={address} lastDeployedSumm={lastDeployedSumm} /> */}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const address = params.address;
  return { props: { address } };
}

export default summs;
