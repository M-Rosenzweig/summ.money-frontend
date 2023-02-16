import React, { useState, useEffect } from "react";

function SummRange({ currentOffer, highestNumber, lowestNumber }) {
  const [summLowRange, setSummLowRange] = useState(0);
  const [summHighRange, setSummHighRange] = useState(0);

  useEffect(() => {
    setInfo();
  }, [currentOffer]);

  function setInfo() {
    // console.log(`highestNumber: ${highestNumber}`);
    // console.log(`lowestNumber: ${lowestNumber}`);
    // console.log(`currentOffer: ${currentOffer}`);
    let lowRangeAddingNumber = (currentOffer - lowestNumber) / 2;
    setSummLowRange(currentOffer - lowRangeAddingNumber);
    let highRangeAddingNumber = (highestNumber - currentOffer) / 2;
    setSummHighRange(currentOffer + highRangeAddingNumber);
  }

  return <div className=" shadow-md p-2 rounded ml-6">{`Summ-Range: ${parseInt(summLowRange)} / ${parseInt(summHighRange)}`}</div>;
}

export default SummRange;
