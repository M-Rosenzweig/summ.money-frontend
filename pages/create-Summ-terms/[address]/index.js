import React, { useState, useEffect } from "react";
import TermCard from "../../../components/TermCard";
import { useMoralis, useWeb3Contract } from "react-moralis";
import networkMapping from "../../../constants/networkMapping.json";
import SummFactoryAbi from "../../../constants/SummFactory.json";
import SummTermsAbi from "../../../constants/SummTerms.json";

// import {ethers} from "ethers";

function createSummTermsV2() {
  const { chainId, account, isWeb3Enabled } = useMoralis();
  const { runContractFunction } = useWeb3Contract();
  let chainString;
  if (chainId == 1337) {
    chainString = parseInt(chainId).toString();
  } else if (chainId == 31337) {
    chainString = parseInt(1337).toString();
  } else if (chainId == 5) {
    chainString = parseInt(chainId).toString();
  }
  // const chainString = chainId ? parseInt(chainId).toString() : "31337";
  // const summFactoryAddress = networkMapping[chainString].summFactory[0];
  const summFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  useEffect(() => {
    console.log(chainId);
    console.log(chainString);
    console.log(summFactoryAddress);
  }, [chainId]);

  const [formData, setFormData] = useState({
    opponent: "",
    softOfferCap: "",
    firmOfferCap: "",
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
    // function createSummTerms(address payable _opponent, uint _softOffers,
    // uint _firmOffers, uint _softRange, uint _firmRange, uint _penaltyPercent)

    const termDetails = {
      abi: SummFactoryAbi,
      contractAddress: summFactoryAddress,
      functionName: "createSummTerms",
      params: {
        _opponent: formData.opponent,
        _softOffers: formData.softOfferCap,
        _firmOffers: formData.firmOfferCap,
        _softRange: formData.softRange,
        _firmRange: formData.firmRange,
        _penaltyPercent: formData.penaltyPercent,
      },
    };

    await runContractFunction({
      params: termDetails,
      onSuccess: (tx) => console.log(tx),
      onError: (error) => {
        console.log(error);
      },
    });

    console.log(summFactoryAddress);
    alert("Howzit! its loading!");

    // getSummTermsAddress();

    setFormData({
      opponent: "",
      softOfferCap: "",
      firmOfferCap: "",
      softRange: "",
      firmRange: "",
      penaltyPercent: "",
    });
  }

  // async function getSummTermsAddress() {

  //   const termDetails = {
  //     abi: SummFactoryAbi,
  //     contractAddress: summFactoryAddress,
  //     functionName: "createSummTerms",
  //     params: {

  //     },
  //   };

  //   await runContractFunction({
  //     params: termDetails,
  //     onSuccess: (tx) => console.log(tx),
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   });

  // }

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
            <label className="block text-gray-700 font-medium mb-2" htmlFor="softOfferCap">
              Soft Offer Cap
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="softOfferCap"
              type="text"
              name="softOfferCap"
              value={formData.softOfferCap}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="firmOfferCap">
              Firm Offer Cap
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="firmOfferCap"
              type="text"
              name="firmOfferCap"
              value={formData.firmOfferCap}
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
                return <TermCard key={key} value={value} termKey={key} />;
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
