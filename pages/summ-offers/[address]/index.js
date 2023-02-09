import React, { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import TermCard from "../../../components/TermCard";
import initializeAndExportSummTermsInstance from "../../../constants/specificSummTerms.js";
import { useMoralis } from "react-moralis";
import SideBarNegotiation from "@/components/SideBarNegotiation";

function summOffers({ address }) {
  const { isWeb3Enabled, account } = useMoralis();
  // const [userAccount, setUserAccount] = useState("");

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
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          {account !== "" && summary.termsStatus !== "" ? (
            <SideBarNegotiation account={account} summary={summary} />
          ) : null}
          <div className="flexParentSumms float-right">
            <div className="flexChild">
              {Object.entries(summary).map(([key, value]) => {
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
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const address = params.address;
  return { props: { address } };
}

export default summOffers;
