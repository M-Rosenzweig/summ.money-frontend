import SummFactory from "./SummFactory.json";
import networkMapping from "./networkMapping.json";
import { ethers } from "ethers";

let provider; 
let network; 
let factory;

if(typeof window !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
    provider = new ethers.providers.InfuraProvider("goerli");
}

async function getNetworkAndSetFactory() {
    network = await provider.getNetwork();
    console.log(network.chainId);
    const summFactoryAddress = networkMapping[network.chainId].summFactory[0];
    return factory = new ethers.Contract(summFactoryAddress, SummFactory, provider);
}


async function initializeAndExportFactory() {
    await getNetworkAndSetFactory();
    return factory;
}

module.exports = initializeAndExportFactory;

