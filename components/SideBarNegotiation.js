import React, { useState, useEffect } from "react";

function SideBarNegotiation({ account, summary }) {
  const [user, setUser] = useState("");
  const [accepted, setAccepted] = useState("");
  const [opponent, setOpponent] = useState("");
  const [creator, setCreator] = useState("");

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
      console.log("yo");
    } else if (account == creator && summary.termsStatus == true) {
      setUser("creator");
      setAccepted("accepted");
      console.log("gersh");
    }
  }
  return (
    <div className="negotiationControls flex-wrap justify-center">
      {user === "opponent" && accepted === "unaccepted" && (
        <>
          <button
            className="bg-emerald-500 text-white font-bold py-5 px-5 rounded mt-8 m-5 "
            onClick={() => {
              // summTermsInstance.respondToTerms(true);
              console.log("accepted");
            }}
          >
            Accept Terms
          </button>
          <button
            className="bg-red-500 text-white font-bold py-5 px-5 rounded mt-8 m-5 "
            onClick={() => {
              // summTermsInstance.respondToTerms(false);
              console.log("rejected");
            }}
          >
            Reject Terms
          </button>
        </>
      )}
      {user === "creator" && accepted === "unaccepted" && (
        <>
          <button
            className="bg-blue-400 text-white font-bold py-1 px-5 rounded mt-8 m-5 "
          >
            Waiting For Opponent To Accept Terms
          </button>
        </>
      )}
    </div>
  );
}

export default SideBarNegotiation;
