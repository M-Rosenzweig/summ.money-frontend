import React, { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import TermCard from "../../../components/TermCard";
import initializeAndExportSummTermsInstance from "../../../constants/specificSummTerms.js";
import initializeAndExportSummInstance from "../../../constants/specificSumm.js";
import SummTerms from "../../../constants/SummTerms.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import SideBarNegotiation from "@/components/SideBarNegotiation";
import ActiveOffers from "@/components/ActiveOffers";
// import { useRouter } from 'next/router';

function summOffers({ address }) {
  const { isWeb3Enabled, account } = useMoralis();
  const [softRoundActive, setSoftRoundActive] = useState("unaware");
  const [currentSoftOffer, setCurrentSoftOffer] = useState("");
  const [currentFirmOffer, setcurrentFirmOffer] = useState("");
  const [specificSummAddress, setSpecificSummAddress] = useState("");

  let summInstanceAddress;
  let summInstance;
  let summTermsInstance;

  const [summary, setSummary] = useState({
    creator: "",
    opponent: "",
    totalSoftOfferCap: "",
    totalFirmOfferCap: "",
    softRange: "",
    firmRange: "",
    penaltyPercent: "",
    termsStatus: "",
  });

  useEffect(() => {
    getSummTermsInstance(address);
  }, [account, summary.termsStatus]);

  async function getSummTermsInstance(address) {
    summTermsInstance = await initializeAndExportSummTermsInstance(address);
    // console.log(summTermsInstance);
    findOutStatusAndGetSummary(summTermsInstance);
  }

  async function findOutStatusAndGetSummary(summTermsInstance) {
    const summaryData = await summTermsInstance.getSummary();

    setSummary({
      creator: summaryData[0],
      opponent: summaryData[1],
      totalSoftOfferCap: BigNumber.from(summaryData[2].toNumber()),
      totalFirmOfferCap: BigNumber.from(summaryData[3].toNumber()),
      softRange: BigNumber.from(summaryData[4].toNumber()),
      firmRange: BigNumber.from(summaryData[5].toNumber()),
      penaltyPercent: BigNumber.from(summaryData[6].toNumber()),
      termsStatus: summaryData[7],
    });

    if (summary.termsStatus !== "" && summary.termsStatus) {
      let summInstanceAddressVariable = await summTermsInstance.createdSumms(0);
      summInstanceAddress = summInstanceAddressVariable;
      setSpecificSummAddress(summInstanceAddress);
      // console.log(summInstanceAddress);
      getSummInstance(summInstanceAddress);
    }

    async function getSummInstance(summInstanceAddress) {
      // console.log(summInstanceAddress);
      summInstance = await initializeAndExportSummInstance(summInstanceAddress);
      console.log(summInstance);
      getSummInfo(summInstance);
    }

    async function getSummInfo(summInstance) {
      let answer = await summInstance.softRoundActive();
      setSoftRoundActive(answer);
      // set amount of soft offers
      let answer2 = await summInstance.currentSoftGiverOffer();
      let answer3 = await summInstance.currentSoftReceiverOffer();
      console.log(BigNumber.from(answer2).toNumber());
      if (account == summary.creator.toLowerCase()) {
        console.log("hey Moish")
        setCurrentSoftOffer(BigNumber.from(answer2).toNumber());
      } else if (account == summary.opponent.toLowerCase()) {
        setCurrentSoftOffer(BigNumber.from(answer3).toNumber());
      }
      // set amount of firm offers
      let answer4 = await summInstance.currentFirmGiverOffer();
      let answer5 = await summInstance.currentFirmReceiverOffer();
      if (account == summary.creator) {
        setcurrentFirmOffer(BigNumber.from(answer4).toNumber());
      }
      if (account == summary.opponent) {
        setcurrentFirmOffer(BigNumber.from(answer5).toNumber());
      }
    }

    // summaryData[7] !== "" && summaryData[7] ? setAccepted("yes") : null;
  }

  return (
    <>
      {summary.termsStatus !== "" && !summary.termsStatus ? (
        <div className="flex flex-wrap">
          <div className="flex flex-wrap">
            {summary.termsStatus !== "" && !summary.termsStatus ? (
              <SideBarNegotiation
                account={account}
                summary={summary}
                address={address}
                SummTerms={SummTerms}
              />
            ) : null}
            <div className="flexParentSumms float-right">
              <div className="flexChild">
                {summary.termsStatus !== "" && !summary.termsStatus
                  ? Object.entries(summary).map(([key, value]) => {
                      if (value !== false) {
                        return (
                          <TermCard
                            key={key}
                            value={value.toString()}
                            termKey={key}
                            requirementText={false}
                          />
                        );
                      }
                      return null;
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      ) : summary.termsStatus !== "" && summary.termsStatus ? (
        <ActiveOffers
          summary={summary}
          account={account}
          softRoundActive={softRoundActive}
          currentSoftOffer={currentSoftOffer}
          currentFirmOffer={currentFirmOffer}
          specificSummAddress={specificSummAddress}
        />
      ) : null}
    </>
  );
}

export async function getServerSideProps({ params }) {
  const address = params.address;
  return { props: { address } };
}

export default summOffers;
