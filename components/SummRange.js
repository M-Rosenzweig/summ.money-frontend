import React, { useState, useEffect } from "react";

function SummRange({ softOfferAmount, highestNumber, lowestNumber }) {
  const [summLowRange, setSummLowRange] = useState(0);
  const [summHighRange, setSummHighRange] = useState(0);

  useEffect(() => {
    setInfo();
  }, [softOfferAmount]);

  function setInfo() {
    // console.log(`highestNumber: ${highestNumber}`);
    // console.log(`lowestNumber: ${lowestNumber}`);
    // console.log(`softOfferAmount: ${softOfferAmount}`);
    let lowRangeAddingNumber = (softOfferAmount - lowestNumber) / 2;
    setSummLowRange(softOfferAmount - lowRangeAddingNumber);
    let highRangeAddingNumber = (highestNumber - softOfferAmount) / 2;
    setSummHighRange(softOfferAmount + highRangeAddingNumber);
  }

  return <div className=" shadow-md p-2 rounded ml-6">{`Summ-Range: ${parseInt(summLowRange)} / ${parseInt(summHighRange)}`}</div>;
}

export default SummRange;
