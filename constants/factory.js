import SummFactory from "./SummFactory.json";
import networkMapping from "./networkMapping.json";
import { ethers } from "ethers";

let provider; 
let network; 

if(typeof window !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
    provider = new ethers.providers.InfuraProvider("goerli");
}

// network = provider.getNetwork();
// console.log(network.chainId)

const summFactoryAddress = networkMapping[5].summFactory[0];

const factory = new ethers.Contract(
    summFactoryAddress, SummFactory, provider
);


export default factory;

