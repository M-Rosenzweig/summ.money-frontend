import React, { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import TermCard from "../../../components/TermCard";
import initializeAndExportSummTermsInstance from "../../../constants/specificSummTerms.js";
import SummTerms from "../../../constants/SummTerms.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import SideBarNegotiation from "@/components/SideBarNegotiation";

function summOffers({ address }) {
  const { isWeb3Enabled, account } = useMoralis();
  const [accepted, setAccepted] = useState("");

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

    summaryData[7] !== "" && summaryData[7] ? setAccepted("yes") : null;
  }

  return (
    <>
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

          {summary.termsStatus !== "" && summary.termsStatus ? (
            <p>yo it has been accepted. lets set state so the ui is different here.</p>
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
