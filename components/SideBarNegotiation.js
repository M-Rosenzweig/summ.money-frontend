import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";

function SideBarNegotiation({ account, summary, address, SummTerms }) {
  const [user, setUser] = useState("");
  const [accepted, setAccepted] = useState("");
  const [opponent, setOpponent] = useState("");
  const [creator, setCreator] = useState("");

  const { isWeb3Enabled } = useMoralis();
  const { runContractFunction } = useWeb3Contract();

  useEffect(() => {
    checkUser();
  }, [account, summary]);

  function checkUser() {
    setOpponent(summary.opponent.toLowerCase());
    setCreator(summary.creator.toLowerCase());

    if (account == opponent && summary.termsStatus == false) {
      setUser("opponent");
      setAccepted("unaccepted");
    } else if (account == opponent && summary.termsStatus == true) {
      setUser("opponent");
      setAccepted("accepted");
      console.log("jay");
    } else if (account == creator && summary.termsStatus == false) {
      setUser("creator");
      setAccepted("unaccepted");
    } else if (account == creator && summary.termsStatus == true) {
      setUser("creator");
      setAccepted("accepted");
      console.log("gersh");
    }
  }

  async function handleTermsResponse(response) {
    console.log(response);
    const paramsForResponse = {
      abi: SummTerms,
      contractAddress: address,
      functionName: "respondToTerms",
      params: { _response: response },
    };
    await runContractFunction({
      params: paramsForResponse,
      onSuccess: (tx) => {
        alert("Transaction successful: The other party has been notified ");
        console.log("this is a sucuessful transaction: " + tx);
      },
      onError: (error) => {
        alert("Transaction failed: " + error.message);
        console.log("this is a failed transaction: " + error.message);
      },
    });
  }

  return (
    <div className="negotiationControls flex-wrap justify-center">
      {user === "opponent" && accepted === "unaccepted" && (
        <>
          <button
            className="bg-emerald-500 text-white font-bold py-5 px-5 rounded mt-8 m-5 "
            onClick={() => {
              handleTermsResponse(true);
            }}
          >
            Accept Terms
          </button>
          <button
            className="bg-red-500 text-white font-bold py-5 px-5 rounded mt-8 m-5 "
            onClick={() => {
              handleTermsResponse(false);
            }}
          >
            Reject Terms
          </button>
        </>
      )}
      {user === "creator" && accepted === "unaccepted" && (
        <>
          <button className="bg-blue-400 text-white font-bold py-1 px-5 rounded mt-8 m-5 ">
            Waiting For Opponent To Accept Terms
          </button>
        </>
      )}
    </div>

    // we want in the case of the user being the opponent and the terms being accepted
  );
}

export default SideBarNegotiation;
