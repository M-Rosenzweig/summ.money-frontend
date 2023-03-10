import React, { useState} from "react";
import TermCard from "../../../components/TermCard";
import { useMoralis, useWeb3Contract } from "react-moralis";
import networkMapping from "../../../constants/networkMapping.json";
import SummFactoryAbi from "../../../constants/SummFactory.json";
import { ethers } from "ethers";

function createSummTermsV2() {
  const { chainId, isWeb3Enabled } = useMoralis();
  const { runContractFunction } = useWeb3Contract();
  const provider = new ethers.providers.InfuraProvider("goerli");

  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const summFactoryAddress = networkMapping[chainString].summFactory[0];

  const [formData, setFormData] = useState({
    opponent: "",
    totalSoftOfferCap: "",
    totalFirmOfferCap: "",
    softRange: "",
    firmRange: "",
    penaltyPercent: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const termDetails = {
      abi: SummFactoryAbi,
      contractAddress: summFactoryAddress,
      functionName: "createSummTerms",
      params: {
        _opponent: formData.opponent,
        _softOffers: formData.totalSoftOfferCap,
        _firmOffers: formData.totalFirmOfferCap,
        _softRange: formData.softRange,
        _firmRange: formData.firmRange,
        _penaltyPercent: formData.penaltyPercent,
      },
    };

    await runContractFunction({
      params: termDetails,
      onSuccess: (tx) => {
        alert("Success: You can view your newly created Summ Terms in MySumms page ");
        console.log(`this is a success message: ${tx}`);
      },
      onError: (error) => {
        alert("Error: " + error.message + "")
        console.log(`this is an error message: ${error.message}`);
      },
    });

    listenToEvent(); 

    setFormData({
      opponent: "",
      totalSoftOfferCap: "",
      totalFirmOfferCap: "",
      softRange: "",
      firmRange: "",
      penaltyPercent: "",
    });
  }
    
  async function listenToEvent() {
    const ContractOfSummFactory = new ethers.Contract(summFactoryAddress, SummFactoryAbi, provider);
    await ContractOfSummFactory.on("NewSumm", (newSummTerms) => {
      console.log(newSummTerms);
    });
  }

  return (
    <>
      <div className="flex flex-wrap">
        <form className="bg-white ml-2 p-7 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="opponent">
              Opponent
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="opponent"
              type="text"
              name="opponent"
              value={formData.opponent}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="totalSoftOfferCap">
              Soft Offer Cap
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="totalSoftOfferCap"
              type="text"
              name="totalSoftOfferCap"
              value={formData.totalSoftOfferCap}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="totalFirmOfferCap">
              Firm Offer Cap
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="totalFirmOfferCap"
              type="text"
              name="totalFirmOfferCap"
              value={formData.totalFirmOfferCap}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="softRange">
              Soft Range
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="softRange"
              type="text"
              name="softRange"
              value={formData.softRange}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="firmRange">
              Firm Range
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="firmRange"
              type="text"
              name="firmRange"
              value={formData.firmRange}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="penaltyPercent">
              penalty Percent
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="penaltyPercent"
              type="text"
              name="penaltyPercent"
              value={formData.penaltyPercent}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="flexParent">
          <div className="flexChild">
            {Object.entries(formData).map(([key, value]) => {
              if (value !== false) {
                return <TermCard key={key} value={value} termKey={key} requirementText={true} />;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default createSummTermsV2;
