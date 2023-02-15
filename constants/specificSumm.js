import Summ from "./Summ.json";
import { ethers } from "ethers";

let provider;
let summInstance;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  provider = new ethers.providers.InfuraProvider("goerli");
}

function setSummInstance(address) {
  return (summInstance = new ethers.Contract(address, Summ, provider));
}

async function initializeAndExportSummInstance(address) {
  await setSummInstance(address);
  return summInstance;
}

module.exports = initializeAndExportSummInstance;
