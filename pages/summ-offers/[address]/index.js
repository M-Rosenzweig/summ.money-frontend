import React, { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import TermCard from "../../../components/TermCard";
import initializeAndExportSummTermsInstance from "../../../constants/specificSummTerms.js";

function summOffers({ address }) {
  let summTermsInstance;
  const [status, setStatus] = useState("");
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
  }, [status]);

  async function getSummTermsInstance(address) {
    summTermsInstance = await initializeAndExportSummTermsInstance(address);
    // console.log("summTermsInstance", summTermsInstance);
    findOutStatusAndGetSummary(summTermsInstance);
  }

  async function findOutStatusAndGetSummary(summTermsInstance) {
    const contractStatus = await summTermsInstance.termsStatus();
    setStatus(contractStatus);

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
        <div className="negotiationControls flex-wrap">
          
          vibes
        
        </div>
        <div className="flexParentSumms float-right">
          <div className="flexChild">
            {Object.entries(summary).map(([key, value]) => {
              if (value !== false) {
                return <TermCard key={key} value={value.toString()} termKey={key} requirementText={false} />;
              }
              return null;
            })}
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

{
  /* <h1>Summ Offers page. where the negotiation happens</h1>
        <p>{summary.creator}</p>
        <p>{summary.opponent}</p>
        <p>{summary.totalSoftOfferCap}</p>
        <p>{summary.termsStatus}</p>
        <p>vibesTribes</p> */
}
