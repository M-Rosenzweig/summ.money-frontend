import React, { useState, useEffect } from "react";
import TopInfoBoxes from "@/components/TopInfoBoxes";
import SummRange from "@/components/SummRange";
import SummAbi from "../constants/Summ.json";
import { useMoralis, useWeb3Contract } from "react-moralis";

function ActiveOffers({
  summary,
  account,
  softRoundActive,
  currentOffers,
  specificSummAddress,
  balance,
}) {
  const [softOfferAmount, setSoftOfferAmount] = useState("");
  const [offerAcceptable, setOfferAcceptable] = useState(false);
  const [lowestNumber, setlowestNumber] = useState(0);
  const [highestNumber, sethighestNumber] = useState(0);
  const [currentOffer, setCurrentOffer] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [DepositAmount, setDepositAmount] = useState("");

  const { runContractFunction } = useWeb3Contract();

  // console.log(summary.softRange.toNumber());

  useEffect(() => {
    setInfo();
    // console.log(currentSoftOfferNumber);
    // console.log("this is the current offers vibessssssss")
    // console.log(currentOffers);
    // console.log(specificSummAddress);
  }, [account, currentOffers, balance]);

  async function setInfo() {
    console.log(balance);

    if (account == summary.opponent.toLowerCase() && softRoundActive == true) {
      // console.log("hello! this should hit")
      setFunctionName("initiateSoftReceiverOffer");
    } else if (account == summary.opponent.toLowerCase() && softRoundActive == false) {
      setFunctionName("initiateFirmReceiverOffer");
    } else if (account == summary.creator.toLowerCase() && softRoundActive == true) {
      setFunctionName("initiateSoftGiverOffer");
    } else if (account == summary.creator.toLowerCase() && softRoundActive == false) {
      setFunctionName("initiateFirmGiverOffer");
    }
    console.log(`functionName ${functionName}`);
  }

  async function handleOfferSubmit(e) {
    e.preventDefault();
    console.log("this is the function name Jerryyyy");
    console.log(functionName);

    const offerDetails = {
      abi: SummAbi,
      contractAddress: specificSummAddress,
      functionName: functionName,
      params: {
        _amount: softOfferAmount,
      },
    };
    await runContractFunction({
      params: offerDetails,
      onSuccess: (tx) => {
        alert("Success: You have initiated an offer to the blockchain.");
        console.log(`this is a success message: ${tx}`);
      },
      onError: (error) => {
        alert("Error: " + error.message + "");
        console.log(`this is an error message: ${error}`);
      },
    });

    setSoftOfferAmount(""); // reset the input field
  }

  function setSoftOfferAmountFunction(e) {
    const offerAmount = Number(e.target.value);
    setlowestNumber(parseInt(offerAmount - (offerAmount * summary.softRange.toNumber()) / 100));
    sethighestNumber(parseInt(offerAmount + (offerAmount * summary.softRange.toNumber()) / 100));

    setSoftOfferAmount(offerAmount);
    setCurrentOffer(offerAmount);
  }

  function handleDepositSubmit(e) {
    e.preventDefault();
    console.log(`DepositAmount: ${DepositAmount}`);

    const depositParams = {
      abi: SummAbi,
      contractAddress: specificSummAddress,
      functionName: "deposit",
      msgValue: DepositAmount,

      params: {
        _amount: DepositAmount,
      },
      // from: account,
    };

    runContractFunction({
      params: depositParams,
      onSuccess: (tx) => {
        alert("Success: You have deposited to your Summ balance.");
        console.log(`this is a success message: ${tx}`);
      },
      onError: (error) => {
        alert("Error: " + error.message + "");
        console.log(`this is an error message: ${error}`);
      },
    });
    setDepositAmount("");
  }

  // const { runContractFunction: buyItem } = useWeb3Contract({
  //     abi: nftMarketplaceAbi,
  //     contractAddress: marketplaceAddress,
  //     functionName: "buyItem",
  //     msgValue: price,
  //     params: {
  //         nftAddress: nftAddress,
  //         tokenId: tokenId,
  //     },
  // })

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="h-1/5 w-screen flexChild overflow-x-auto">
          {Object.entries(summary).map(([key, value]) => {
            if (value !== false && key !== "termsStatus") {
              return (
                <TopInfoBoxes
                  key={key}
                  termKey={key}
                  value={value.toString()}
                  account={account}
                  currentOffers={currentOffers}
                />
              );
            }
            return null;
          })}
        </div>
        <div className="h-4/5 w-screen flex flex-col sm:flex-row">
          <div className="w-screen sm:w-1/5 h-2/6 sm:h-full">
            <form className="bg-white p-7 rounded-lg shadow-sm mt-2" onSubmit={handleOfferSubmit}>
              <div className="mb-4 flex flex-wrap">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="opponent">
                  Soft Offer Amount
                </label>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="softOfferAmount"
                  type="text"
                  name="softOfferAmount"
                  value={softOfferAmount}
                  onChange={setSoftOfferAmountFunction}
                />
              </div>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-sm tline"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          <div className=" w-screen sm:w-4/5 h-4/5 sm:h-full flex justify-center items-center shadow-sm rounded ">
            <div className=" w-full h-5/6 flex">
              <div className="h-full w-1/5 flex flex-col items-center">
                {currentOffer ? (
                  <h1 id="scale-in" className="mt-6">
                    Your Offer
                  </h1>
                ) : null}
                <br></br>
                <p>{currentOffer}</p>
              </div>

              {currentOffer ? (
                <div className="h-full w-4/5 shadow-md flex flex-col">
                  <div id="scale-in" className="h-1/4">
                    <h1 className="mt-1 flex justify-start ml-2">
                      {` Soft Range: ${summary.softRange.toNumber()}%
                      `}
                    </h1>
                    <h1 className="mt-4 flex justify-start ml-2">
                      {` The ${
                        account == summary.creator.toLowerCase() ? "Opponent's" : "Creator's"
                      } Offer Must Be `}
                    </h1>

                    <h1 className="mt-1 flex justify-start ml-2">Within The Following Numbers</h1>
                  </div>
                  <div id="scale-in" className="h-2/4 shadow-md flex">
                    <div className="w-1/3 shadow-sm ">
                      <p className="mt-2 ml-2 bg-red-200 h-6 rounded  ">
                        Lowest:{parseInt(lowestNumber)}{" "}
                      </p>
                      <br></br>
                      <p className="ml-2 bg-green-200">Highest:{parseInt(highestNumber)} </p>
                    </div>
                    <div className="w-2/3 flex">
                      <p className="mt-6 ml-6">
                        {/* Summ-Range:{`${summLowRange} / ${summHighRange}`}{" "} CAN MAKE TERNARY.. */}
                        <SummRange
                          currentOffer={currentOffer}
                          highestNumber={highestNumber}
                          lowestNumber={lowestNumber}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="h-1/4 flex justify-center items-start mt-1">
                    {/* {!offerAcceptable and we gave offer already... :)  ? (
                      <div className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-sm tline">
                        {`Waiting For ${
                          account == summary.creator.toLowerCase() ? "Opponent" : "Creator"
                        } Offer`}
                      </div>
                    ) : null} */}

                    {offerAcceptable ? (
                      <button className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center mt-auto mb-auto py-3 px-2 rounded focus:outline-none focus:shadow-sm tline">
                        Accept Offer
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start float-left">
        <p className="w-fit">Your current balance is {balance} </p>

        <form onSubmit={handleDepositSubmit} className="max-w-sm mx-auto mt-2 ">
          <div className="flex items-start border-b-2 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none float-left"
              type="text"
              placeholder="Enter Amount"
              value={DepositAmount}
              onChange={(event) => setDepositAmount(event.target.value)}
            />
            <button
              className="flex-shrinbg-blue-50 bg-purple-300 hover:text-white hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-0 p-2 px-2 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ActiveOffers;

{
  /* {Object.entries(summary).map(([key, value]) => {
            if (value !== false) {
              return <TermCard
                key={key}
                value={value.toString()}
                termKey={key}
                requirementText={false}

              />;
            }
            return null;
          })} */
}
