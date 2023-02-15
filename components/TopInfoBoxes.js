import React, { useState, useEffect } from "react";

function TopInfoBoxes({ termKey, value, account, currentSoftOfferNumber }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (termKey == "opponent") {
      if (account == value.toLowerCase()) {
        setTitle("You");
      } else {
        setTitle("Opponent");
      }
    } else if (termKey == "totalSoftOfferCap") {
      setTitle("Soft Offers");
    } else if (termKey == "totalFirmOfferCap") {
      setTitle("Firm Offers");
    } else if (termKey == "softRange") {
      setTitle("Soft Range");
    } else if (termKey == "firmRange") {
      setTitle("Firm Range");
    } else if (termKey == "penaltyPercent") {
      setTitle("Penalty Percent");
    } else if (termKey == "creator") {
      if (account == value.toLowerCase()) {
        setTitle("You");
      } else {
        setTitle("Creator");
      }
    }
  }, [termKey, account]);

  let ternaryValue =
    termKey == "opponent" || termKey == "creator"
      ? value.slice(0, 5) + "..." + value.slice(-5)
      : value;
  let ternaryValuePercent =
    termKey == "softRange" || termKey == "firmRange" || termKey == "penaltyPercent"
      ? ternaryValue + "%"
      : ternaryValue;

  let ternaryValueOfferStatus =
    termKey == "totalSoftOfferCap"
      ? currentSoftOfferNumber + " / " + ternaryValuePercent
      : ternaryValuePercent;

  return (
    <div className="m-8 bg-blue-50 p-4 rounded-lg shadow-md">
      <p>{title}</p>
      <p className="text-center">{ternaryValueOfferStatus}</p>
    </div>
  );
}

export default TopInfoBoxes;
