import React, { useState, useEffect } from "react";
import SummCard from "../../../components/SummCard";
import { useMoralis, useWeb3Contract } from "react-moralis";
import networkMapping from "../../../constants/networkMapping.json";
import SummFactoryAbi from "../../../constants/SummFactory.json";
import { ethers } from "ethers";

function summs({ address }) {
  let deployedSumms;
  const shortenedAddress = address.slice(0, 6) + "..." + address.slice(-6);
  const provider = new ethers.providers.InfuraProvider("goerli");
  // const provider = new ethers.providers.Web3Provider(window.ethereum); // dosent know what window is...

  


  const { chainId, isWeb3Enabled } = useMoralis();
  const { runContractFunction } = useWeb3Contract();

  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const summFactoryAddress = networkMapping[chainString].summFactory[0];


  useEffect(() => {
    getTheDeets();
}, [chainId]);

async function getTheDeets() {
  console.log("getting the deets"); 
  // const factory = new ethers.Contract(summFactoryAddress, SummFactoryAbi, provider);
  // deployedSumms = await factory.deployedSumms(0);
  // // const allDeployedSumms = await factory.getDeployeds();
  // console.log(deployedSumms);
  // console.log(allDeployedSumms);

  // const callDetails = {
  //   abi: SummFactoryAbi,
  //   contractAddress: summFactoryAddress,
  //   functionName: "deployedSumms",
  //   params: {
  //     _index: "0",
  //   },
  // };

  // await runContractFunction({
  //   params: callDetails,
  //   onSuccess: (tx) => {
  //     console.log(`this is a success message: ${tx}`);
  //   },
  //   onError: (error) => {
  //     console.log(`this is an error message: ${error}`);
  //   },
  // });
}
// const title = deployedSumms ? deployedSumms : address; 
// const shortenedTitle = title.slice(0, 6) + "..." + title.slice(-6);


  return (
    <>
      {/* <div className="flex flex-row justify-center " >
        Status:
      </div> */}
      <div id="TestMySumms" className="flexParentSumms">
        <div className="flexChild">
          <SummCard address={shortenedAddress} />
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
