import React, { useState, useEffect } from "react";
import TopInfoBoxes from "@/components/TopInfoBoxes";

function ActiveOffers({ summary, account, softRoundActive, currentSoftOffer, currentFirmOffer}) {
  const [softOfferAmuont, setSoftOfferAmuont] = useState("");
  const [currentSoftOfferNumber, setCurrentSoftOfferNumber] = useState('');
  const [currentFirmOfferNumber, setCurrentFirmOfferNumber] = useState('');

  useEffect(() => {
    // console.log: }`);
    // console.log(softRoundActive);
    setInfo(); 
    // g();
  }, [account]);

  async function setInfo() {
    console.log(currentSoftOffer);
    if(currentSoftOffer == false) {
      console.log("heyJayy")
      setCurrentSoftOfferNumber(0);
      } else if(currentSoftOffer == true) {
      setCurrentSoftOfferNumber(currentSoftOffer);
      }
    if(currentFirmOffer == false) {
      setCurrentFirmOfferNumber(0);
      // console.log(currentFirmOffer == true);
      } else if(currentFirmOffer == true) {
      setCurrentFirmOfferNumber(currentFirmOffer);
      }
  }


  function handleOfferSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }

  function setSoftOfferAmountFunction(e) {
    setSoftOfferAmuont(e.target.value);
  }

  // console.lo);

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="h-1/5 w-screen flexChild overflow-x-auto">
          {Object.entries(summary).map(([key, value]) => {
            if (value !== false && key !== "termsStatus") {
              return (
                <TopInfoBoxes key={key} termKey={key} value={value.toString()} account={account} currentSoftOfferNumber={currentSoftOfferNumber} currentFirmOfferNumber={currentFirmOfferNumber} />
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
                  value={softOfferAmuont}
                  onChange={setSoftOfferAmountFunction}
                />
              </div>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          <div className=" bg-blue-50 w-screen sm:w-4/5 h-4/5 sm:h-full flex justify-center items-center shadow-sm ">
            <div className="bg-green-50 w-5/6 sm:w-2/2 h-5/6 sm:h-2/2 mb-8 mr-6"></div>
          </div>
        </div>
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
