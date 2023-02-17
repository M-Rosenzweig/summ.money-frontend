import Summ from "./Summ.json";
import { ethers } from "ethers";


let provider;
let summInstance;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  provider = new ethers.providers.InfuraProvider(
    "goerli",
    // "https://goerli.infura.io/v3/7ea105b70ae146ae9d4cf57c019729a1"
  );
}

// provider.getBlockNumber().then((blockNumber) => {
//   console.log(`Latest block number: ${blockNumber}`);
// }).catch((error) => {
//   console.error(`Error getting block number: ${error}`);
// });

function setSummInstance(address) {
  return (summInstance = new ethers.Contract(address, Summ, provider));
}

async function initializeAndExportSummInstance(address) {
  await setSummInstance(address);
  return summInstance;
}

module.exports = initializeAndExportSummInstance;








// Soft Range: {summary.softRange.toNumber()}%
