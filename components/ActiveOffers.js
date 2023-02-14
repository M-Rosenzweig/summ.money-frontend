import React, { useState, useEffect } from "react";
import TopInfoBoxes from "@/components/TopInfoBoxes";

function ActiveOffers({ summary, account, summInstance }) {
  const [softOfferAmuont, setSoftOfferAmuont] = useState("");


  useEffect(() => {
    console.log((`summInstance: ${summInstance}`))
    // getSummInstance();
  }, [account, summInstance]);

  // async function getSummInstance() {
  //   const summInstance = await summTermsInstance.createdSumms(0);
  //   console.log(summInstance);
  // }

  function handleOfferSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }

  function setSoftOfferAmountFunction(e) {
    setSoftOfferAmuont(e.target.value);
  }

  console.log(summInstance);

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="h-1/5 w-screen flexChild overflow-x-auto">
          {Object.entries(summary).map(([key, value]) => {
            if (value !== false && key !== "termsStatus") {
              return (
                <TopInfoBoxes key={key} termKey={key} value={value.toString()} account={account} />
              );
            }
            return null;
          })}
        </div>
        <div class="h-4/5 w-screen flex flex-col sm:flex-row">
          <div class="w-screen sm:w-1/5 h-2/6 sm:h-full">
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
          <div class="w-screen sm:w-4/5 bg-blue-50 h-4/5 sm:h-full">Right side</div>
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
