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
  const [specificSummAddress, setSpecificSummAddress] = useState("");
  const [balance, setBalance] = useState('');
  const [currentOffers, setCurrentOffers] = useState({
    softReceiverOffer: "",
    softGiverOffer: "",
    firmReceiverOffer: "",
    firmGiverOffer: "",
  });

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
      // console.log(summInstance);
      getSummInfo(summInstance);
    }

    async function getSummInfo(summInstance) {
      const balanceData = await summInstance.checkBalance({ from: account });
      setBalance(BigNumber.from(balanceData).toNumber());

      let answer = await summInstance.softRoundActive();
      setSoftRoundActive(answer);
      // set amount of soft offers
      let answer2 = await summInstance.currentSoftGiverOffer();
      let answer3 = await summInstance.currentSoftReceiverOffer();
      let answer4 = await summInstance.currentFirmGiverOffer();
      let answer5 = await summInstance.currentFirmReceiverOffer();
      console.log(summInstance);
      console.log(`answer2: ${answer2}`);
      console.log(`answer3: ${answer3}`);
      console.log(`answer4: ${answer4}`);
      console.log(`answer5: ${answer5}`);


      setCurrentOffers({
        softReceiverOffer: BigNumber.from(answer3).toNumber(),
        softGiverOffer: BigNumber.from(answer2).toNumber(),
        firmReceiverOffer: BigNumber.from(answer5).toNumber(),
        firmGiverOffer: BigNumber.from(answer4).toNumber(),
      });

      currentOffers.softReceiverOffer == "undefined"
        ? setCurrentOffers({ softReceiverOffer: 0 })
        : null;
      currentOffers.softGiverOffer == "undefined" ? setCurrentOffers({ softGiverOffer: 0 }) : null;
      currentOffers.firmReceiverOffer == "undefined"
        ? setCurrentOffers({ firmReceiverOffer: 0 })
        : null;
      currentOffers.firmGiverOffer == "undefined" ? setCurrentOffers({ firmGiverOffer: 0 }) : null;

      // if (account == summary.creator) {
      //   setcurrentFirmOffer(BigNumber.from(answer4).toNumber());
      // }
      // if (account == summary.opponent) {
      //   setcurrentFirmOffer(BigNumber.from(answer5).toNumber());
      // }
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
          currentOffers={currentOffers}
          specificSummAddress={specificSummAddress}
          balance={balance}
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
