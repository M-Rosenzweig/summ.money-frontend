import { AccordionSummary } from "@mui/material";
import React, { useState, useEffect } from "react";

function TopInfoBoxes({ termKey, value, account, currentOffers, softRoundActive }) {
  const [title, setTitle] = useState("");
  const [focus, setFocus] = useState("");

  useEffect(() => {
    if (termKey == "totalSoftOfferCap") {
      if (softRoundActive == true) {
        setFocus("bg-purple-100");
        // console.log("s")
      }
    }
    if (termKey == "totalFirmOfferCap") {
      if (softRoundActive == false) {
        setFocus("bg-purple-100");
        // console.log('f')
      }
    }

    if (termKey == "totalSoftOfferCap" || termKey == "totalFirmOfferCap") {
      if (currentOffers.firmGiverOffer == "") {
        currentOffers.firmGiverOffer = 0;
      }
      if (currentOffers.firmReceiverOffer == "") {
        currentOffers.firmReceiverOffer = 0;
      }
      if (currentOffers.softGiverOffer == "") {
        currentOffers.softGiverOffer = 0;
      }
      if (currentOffers.softReceiverOffer == "") {
        currentOffers.softReceiverOffer = 0;
      }
    }

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
        setTitle("Creator");
      } else {
        setTitle("Creator");
      }
    }
  }, [termKey, account, softRoundActive]);

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
      ? `${currentOffers.softReceiverOffer} / ${value} | ${currentOffers.softGiverOffer} / ${value}`
      : ternaryValuePercent;

  let ternaryValueOfferStatus2 =
    termKey == "totalFirmOfferCap"
      ? `${currentOffers.firmReceiverOffer} / ${value} | ${currentOffers.firmGiverOffer} / ${value}`
      : ternaryValueOfferStatus;

  //   termKey == "totalSoftOfferCap"
  //     ? currentSoftOfferNumber + " / " + ternaryValuePercent
  //     : ternaryValuePercent;
  // let ternaryValueOfferStatus2 =
  //   termKey == "totalFirmOfferCap"
  //     ? currentFirmOfferNumber + " / " + ternaryValuePercent
  //     : ternaryValueOfferStatus;

  return (
    <div className={`m-8 bg-blue-50 p-4 rounded-lg shadow-md ${focus}`}>
      <p>{title}</p>
      <p className="text-center">{ternaryValueOfferStatus2}</p>
    </div>
  );
}

export default TopInfoBoxes;
