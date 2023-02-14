import React from "react";

function TopInfoBoxes({ termKey, value }) {
  let ternaryValue =
    termKey == "opponent" || termKey == "creator"
      ? value.slice(0, 5) + "..." + value.slice(-5)
      : value;
  let ternaryValuePercent =
    termKey == "softRange" || termKey == "firmRange" || termKey == "penaltyPercent"
      ? ternaryValue + "%"
      : ternaryValue;

  return (
    <div className="m-4">
      <p>{termKey}</p>
      <p>{ternaryValue}</p>
    </div>
  );
}

export default TopInfoBoxes;
