import React, { useState, useEffect } from "react";

function TopInfoBoxes({ termKey, value }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (termKey == "opponent") {
      setDescription("The address of the opponent in this Summ.");

      setTitle("Opponent");
    } else if (termKey == "totalSoftOfferCap") {
      setDescription("The maximum amount of soft offer rounds.");

      setTitle("Soft Offer Cap");
    } else if (termKey == "totalFirmOfferCap") {
      setDescription("The maximum amount of firm offers rounds.");

      setTitle("Firm Offer Cap");
    } else if (termKey == "softRange") {
      setDescription("The percentage range difference you can compromise on in soft rounds.");

      setTitle("Soft Range");
    } else if (termKey == "firmRange") {
      setDescription("The percentage range difference you can compromise on in firm rounds.");
      setTitle("Firm Range");
    } else if (termKey == "penaltyPercent") {
      setDescription("The percentage used for penalties in firm round of average number.");

      setTitle("Penalty Percent");
    } else if (termKey == "creator") {
      setDescription("The address of the creator of the negotiation.");
      setTitle("Creator");
    }
  }, [termKey]);

  let ternaryValue =
    termKey == "opponent" || termKey == "creator"
      ? value.slice(0, 5) + "..." + value.slice(-5)
      : value;
  let ternaryValuePercent =
    termKey == "softRange" || termKey == "firmRange" || termKey == "penaltyPercent"
      ? ternaryValue + "%"
      : ternaryValue;

  return (
    <div className="m-8 bg-blue-100 p-4 rounded-lg">
      <p>{title}</p>
      <p className="text-center">{ternaryValuePercent}</p>
    </div>
  );
}

export default TopInfoBoxes;
