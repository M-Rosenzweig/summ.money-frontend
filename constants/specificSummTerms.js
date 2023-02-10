import SummTerms from "./SummTerms.json";
import networkMapping from "./networkMapping.json";
import { ethers } from "ethers";

let provider;
let network;
let summTermsInstance;

if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  provider = new ethers.providers.InfuraProvider("goerli");
}


function getNetworkAndSetTermsInstance(address) {
  return (summTermsInstance = new ethers.Contract(address, SummTerms, provider));
}

async function initializeAndExportSummTermsInstance(address) {
  await getNetworkAndSetTermsInstance(address);
  return summTermsInstance;
}

module.exports = initializeAndExportSummTermsInstance; 
