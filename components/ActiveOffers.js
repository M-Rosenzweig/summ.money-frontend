import React, { useState, useEffect } from "react";
import TopInfoBoxes from "@/components/TopInfoBoxes";

function ActiveOffers({ summary, account, softRoundActive, currentSoftOffer, currentFirmOffer }) {
  const [softOfferAmuont, setSoftOfferAmuont] = useState("");
  const [currentSoftOfferNumber, setCurrentSoftOfferNumber] = useState("");
  const [currentFirmOfferNumber, setCurrentFirmOfferNumber] = useState("");
  const [offerAcceptable, setOfferAcceptable] = useState(false);
  const [lowestNumber, setlowestNumber] = useState(0);
  const [highestNumber, sethighestNumber] = useState(0);

  // console.log(summary.softRange.toNumber());

  useEffect(() => {
    setInfo();
  }, [account]);

  async function setInfo() {
    // console.log(currentSoftOffer);
    // console.log("jaaaa")
    if (currentSoftOffer == false) {
      // console.log("heyJayy");
      setCurrentSoftOfferNumber(0);
    } else if (currentSoftOffer == true) {
      setCurrentSoftOfferNumber(currentSoftOffer);
    }
    if (currentFirmOffer == false) {
      setCurrentFirmOfferNumber(0);
      // console.log(currentFirmOffer == true);
    } else if (currentFirmOffer == true) {
      setCurrentFirmOfferNumber(currentFirmOffer);
    }
  }

  function handleOfferSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }

  function setSoftOfferAmountFunction(e) {
    setSoftOfferAmuont(e.target.value);
    setlowestNumber(e.target.value - (e.target.value * summary.softRange.toNumber()) / 100);
    sethighestNumber(
      Number(e.target.value) + (Number(e.target.value) * Number(summary.softRange.toNumber())) / 100
    );
  }

  // console.lo);

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
                  currentSoftOfferNumber={currentSoftOfferNumber}
                  currentFirmOfferNumber={currentFirmOfferNumber}
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
                  value={softOfferAmuont}
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
            <div class=" w-5/6 h-5/6 flex">
              <div class="h-full w-1/5 flex flex-col items-center">
                {softOfferAmuont ? (
                  <h1 id="scale-in" className="mt-6">
                    Your Offer
                  </h1>
                ) : null}
                <br></br>
                <p>{softOfferAmuont}</p>
                {offerAcceptable ? (
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-auto mb-8 py-2 px-2 rounded focus:outline-none focus:shadow-sm tline">
                    Accept Offer
                  </button>
                ) : null}
              </div>

              {softOfferAmuont ? (
                <div className="h-full w-4/5 shadow-md flex flex-col">
                  <div id="scale-in" className="h-1/4">
                    <h1 className="mt-6 flex justify-center">
                      To Be Within Range Of {summary.softRange.toNumber()}%
                    </h1>
                    <h1 className="mt-1 flex justify-center">
                      The Other Parties Offer Must Be Within
                    </h1>
                    <h1 className="mt-1 flex justify-center">The Following Numbers</h1>
                  </div>
                  <div id="scale-in" className="h-2/4 shadow-md flex">
                    <div className="min-w-full shadow-sm flex">
                      <p className="mt-12 ml-6 bg-red-200 h-6 rounded">Lowest:{lowestNumber} </p>
                      <br></br>
                      <p className="mt-12 ml-6 bg-green-200 h-6 rounded">
                        Highest:{highestNumber}{" "}
                      </p>
                    </div>
                    {/* <div className="w-1/2 flex">
                      <p className="mt-12 ml-6">Highest:{highestNumber} </p>
                    </div> */}
                  </div>
                  <div className="h-1/4"></div>
                </div>
              ) : null}
            </div>
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
